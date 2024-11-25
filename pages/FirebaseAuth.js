import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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

const signUp = (email, password) => {
  let app;

  if (getApps().length === 0) {
    // Check if Firebase app is already initialized

    app = initializeApp(firebaseConfig); // If no app is initialized, initialize the app
  } else {
    // If Firebase is already initialized, use the existing app
    app = getApp(); // get the default app
  }
  const auth = getAuth(app); // Get Firebase Authentication instance
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("User signed up successfully!");
      alert("user-SignUp successful");
    })
    .catch((error) => {
      console.error("Catch-Error signing up: ", error.message);
      alert(error);
    });
};

export default signUp;
