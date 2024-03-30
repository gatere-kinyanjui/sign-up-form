// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

interface IFirestoreUserCredentials {
  id: string;
  firstName: string;
  secondName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export const signUpWithEmailAndPassword = async (
  email: string,
  password: string,
  credentials: IFirestoreUserCredentials
) => {
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Assign the user's properties to the credentials object
    credentials.id = user.uid;
    credentials.email = user.email || "";

    // Add the credentials to the Firestore collection
    await addDoc(collection(db, "users"), credentials);

    console.log("New user created.", user);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default firebaseApp;
