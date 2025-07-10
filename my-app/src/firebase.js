import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbRg_B-tCLOkV1ysD-m9CZCKK-4OPzE_w",
  authDomain: "collegerideshare-b02a9.firebaseapp.com",
  projectId: "collegerideshare-b02a9",
  storageBucket: "collegerideshare-b02a9.appspot.com",
  messagingSenderId: "159775456742",
  appId: "1:159775456742:web:6053aa8fc7833d5aa02a27",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, signInWithPopup, signOut, db };
