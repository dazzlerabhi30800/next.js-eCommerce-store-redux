import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./FirebaseConfig";

export const fetchCategory = async () => {
  const data = await fetch("https://dummyjson.com/products/categories");
  const response = await data.json();
  return response;
};
