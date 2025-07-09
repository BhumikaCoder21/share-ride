// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbRg_B-tCLOkV1ysD-m9CZCKK-4OPzE_w",
  authDomain: "collegerideshare-b02a9.firebaseapp.com",
  projectId: "collegerideshare-b02a9",
  storageBucket: "collegerideshare-b02a9.firebasestorage.app",
  messagingSenderId: "159775456742",
  appId: "1:159775456742:web:6053aa8fc7833d5aa02a27",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, signInWithPopup, signOut };
