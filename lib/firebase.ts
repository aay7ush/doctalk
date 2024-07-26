import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBiTTBloh5RqGVvygWZvQyNX2wLH1xtBCw",
  authDomain: "doctalk-2719b.firebaseapp.com",
  projectId: "doctalk-2719b",
  storageBucket: "doctalk-2719b.appspot.com",
  messagingSenderId: "1029397759133",
  appId: "1:1029397759133:web:064319af0b3206524a0074",
  measurementId: "G-WC7Y0CFGFY",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
