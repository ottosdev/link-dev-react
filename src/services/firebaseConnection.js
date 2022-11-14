import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6XmudEhAVtgOsHtVRp1d9IIBQ-Q8J5YY",
  authDomain: "devlinks-f8d03.firebaseapp.com",
  projectId: "devlinks-f8d03",
  storageBucket: "devlinks-f8d03.appspot.com",
  messagingSenderId: "791386034947",
  appId: "1:791386034947:web:e9c26da9cf95ebe945cf36",
  measurementId: "G-Z94FDSE12Z",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
