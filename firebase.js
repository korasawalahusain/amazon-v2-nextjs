import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = JSON.parse(process.env.firebase_config);

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db, app };
