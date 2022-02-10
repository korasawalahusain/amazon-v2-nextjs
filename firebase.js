import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATKC5GG6WELkq0AhTZ7GpFXQPqiEYXVTc",
  authDomain: "nextjs-clone-8d429.firebaseapp.com",
  projectId: "nextjs-clone-8d429",
  storageBucket: "nextjs-clone-8d429.appspot.com",
  messagingSenderId: "371348101515",
  appId: "1:371348101515:web:f26e431496dbd1dbf0778e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db, app };
