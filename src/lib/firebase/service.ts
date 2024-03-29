"use server";

import {
  addDoc,
  getDoc,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { collection, getDocs, doc } from "firebase/firestore";
import bcrypt, { compare } from "bcrypt";
import app from "./init";

interface User {
  fullname: string;
  email: string;
  password: string;
  role: string;
  resetPasswordToken: string;
  resetPasswordTokenExpiry: string;
  type?: string;
}

const firestore = getFirestore(app);

export const getData = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(firestore, collectionName));
  const data = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  return data;
};

export const getDataById = async (collectionName: string, id: string) => {
  const querySnapshot = await getDoc(doc(firestore, collectionName, id));
  const data = querySnapshot.data();

  return data;
};

export const getUserBy = async (
  email: string,
  field: string
): Promise<User & { id: string }> => {
  const q = query(collection(firestore, "users"), where(field, "==", email));
  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const user = users[0] || null;

  return user as any;
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
  role?: string;
}) => {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );
  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data }));

  return new Promise<{ status: boolean; message: string }>(async (res) => {
    if (users.length > 0) {
      res({ status: false, message: "Email already exists" });
    }
    data.role = data.role || "user";
    data.password = await bcrypt.hash(data.password, 10);

    addDoc(collection(firestore, "users"), {
      ...data,
      resetPasswordToken: null,
      resetPasswordTokenExpiry: null,
    })
      .then(() => {
        res({ status: true, message: "Register success" });
      })
      .catch((error) => {
        res({ status: false, message: error.message });
      });
  });
};

export const login = async (data: {
  email: string;
  password: string;
}): Promise<{
  status: boolean;
  message: string;
  data?: { id: string; fullname: string; email: string; password: string };
}> => {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );
  const snapshot = await getDocs(q);
  const user: any = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (user.length < 1)
    return {
      status: false,
      message: "Email not found",
    };

  const confirmPassword = await compare(data.password, user[0].password);

  if (!confirmPassword)
    return {
      status: false,
      message: "Wrong password",
    };

  return {
    status: true,
    message: "Login success",
    data: user[0],
  };
};

export async function loginWithGoogle(data: any) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );

  const snapshot = await getDocs(q);

  const user: any = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (user.length > 0) {
    data.role = user[0].role;
    const tes = await updateDoc(doc(firestore, "users", user[0].id), {
      ...data,
      resetPasswordToken: null,
      resetPasswordTokenExpiry: null,
    });
  } else {
    data.role = "user";
    await addDoc(collection(firestore, "users"), {
      ...data,
      resetPasswordToken: null,
      resetPasswordTokenExpiry: null,
    });
  }

  return data;
}

export const setUser = async (id: string, user: User) => {
  await updateDoc(doc(firestore, "users", id), {
    ...user,
  });

  return user;
};

export const checkResetPasswordToken = async (
  token: string
): Promise<boolean> => {
  const q = query(
    collection(firestore, "users"),
    where("resetPasswordToken", "==", token)
  );
  const snapshot = await getDocs(q);
  const users: any = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (users.length < 1) return false;

  const tokenExpiry = new Date(users[0].resetPasswordTokenExpiry);
  const today = new Date();
  if (today > tokenExpiry) return false;

  return true;
};

export const changeUserPassword = async (
  token: string,
  password: string
): Promise<string> => {
  const user = await getUserBy(token, "resetPasswordToken");
  if (!user) throw new Error("User not found");

  const today = new Date();
  const tokenExpiry = new Date(user.resetPasswordTokenExpiry);
  console.log(tokenExpiry);
  if (today > tokenExpiry) throw new Error("Token expired");

  const passwordHash = bcrypt.hashSync(password, 10);
  await updateDoc(doc(firestore, "users", user.id), {
    ...user,
    password: passwordHash,
    resetPasswordToken: null,
    resetPasswordTokenExpiry: null,
  });

  return "Password changed successfully";
};
