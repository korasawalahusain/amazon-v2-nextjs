import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAcVhsXOe57imxx8iRXk4nb-dV8Pb5jmZs",
  authDomain: "clone-nextjs-dcd54.firebaseapp.com",
  projectId: "clone-nextjs-dcd54",
  storageBucket: "clone-nextjs-dcd54.appspot.com",
  messagingSenderId: "353648867689",
  appId: "1:353648867689:web:c043670dbac290afaea5f8",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
