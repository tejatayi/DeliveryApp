import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";

//const [user_authorized, setuser_authorized] = useState(false);

const firebaseConfig = {
  apiKey: "AIzaSyA_gzi7-qypJ0uk_NI-kOiMmQowgG-JCno",
  authDomain: "deliveryapplication-5df3a.firebaseapp.com",
  databaseURL: "https://deliveryapplication-5df3a-default-rtdb.firebaseio.com",
  projectId: "deliveryapplication-5df3a",
  storageBucket: "deliveryapplication-5df3a.firebasestorage.app",
  messagingSenderId: "988916383847",
  appId: "1:988916383847:web:8749808d002b6f08ae14c2",
  measurementId: "G-7XDVFH6JBG",
};

// Initialize Firebase if not already initialized

export const signUp = (email, password, navigation) => {
  let app;
  // Check if Firebase app is already initialized
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig); // If no app is initialized, initialize the app
  } else {
    app = getApp(); //If Firebase is already initialized, use the existing app,get the default app
  }
  const auth = getAuth(app); // Get Firebase Authentication instance
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log(`${email} Signed up successfully!`);
      navigation.navigate("MenuPage");
    })
    .catch((error) => {
      console.error(` Sign_Up for user ${email} failed:`, error.message);
      alert(error);
    });
};

export const signIn = (email, password, navigation) => {
  console.log(`Signin for ${email} initiated`);
  let app;
  // Check if Firebase app is already initialized
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig); // If no app is initialized, initialize the app
  } else {
    app = getApp(); // If Firebase is already initialized, use the existing app,get the default app
  }
  const auth = getAuth(app); // Get Firebase Authentication instance
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log(`Signin for ${email} successfully`);
      navigation.navigate("MenuPage");
    })
    .catch((error) => {
      console.error(` Sign_In for user ${email} failed:`, error.message);
      alert(error);
    });
};

//export default signUp;
