// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY === undefined) {
//   throw new Error("firebase api key is undefined");
// }

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "e-commerce-next-b710f.firebaseapp.com",
  projectId: "e-commerce-next-b710f",
  storageBucket: "e-commerce-next-b710f.appspot.com",
  messagingSenderI: "1096766864819",
  appId: "1:1096766864819:web:90562c1710787985ff9fc6",
  measurementId: "G-SG9TRN29E6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();

export const auth = getAuth(app);

// export const database = getDatabase(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
