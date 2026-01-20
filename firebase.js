// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQJ_5kzOMva4Z-NxrPpxm98uAhfKaZmcg",
  authDomain: "tattol-64321.firebaseapp.com",
  projectId: "tattol-64321",
  databaseURL: "https://tattol-64321-default-rtdb.firebaseio.com",
  storageBucket: "tattol-64321.firebasestorage.app",
  messagingSenderId: "143519859831",
  appId: "1:143519859831:web:3c434c5137a5aa77393272",
  measurementId: "G-1J12W5NQPW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);

export { auth, db, storage };