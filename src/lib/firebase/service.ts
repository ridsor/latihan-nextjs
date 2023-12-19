import { addDoc, getDoc, getFirestore, query, where } from "firebase/firestore";
import { collection, getDocs, doc } from "firebase/firestore";
import bcrypt from "bcrypt";
import app from "./init";

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

    addDoc(collection(firestore, "users"), data)
      .then(() => {
        res({ status: true, message: "Register success" });
      })
      .catch((error) => {
        res({ status: false, message: error.message });
      });
  });
};
