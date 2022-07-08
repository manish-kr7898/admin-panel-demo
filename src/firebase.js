import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFjFhfTK36cDs3U6cosdP-b4AtYs5bHMM",
  authDomain: "dashboard-3d6b5.firebaseapp.com",
  projectId: "dashboard-3d6b5",
  storageBucket: "dashboard-3d6b5.appspot.com",
  messagingSenderId: "484910228854",
  appId: "1:484910228854:web:c5623e6c19d560fd958657"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);


