import { getDoc, getFirestore } from "firebase/firestore";
import { collection, getDocs, doc } from "firebase/firestore";
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
