import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getIdToken,
} from "firebase/auth";
import { useState } from "react";
import axios from "axios"; // this lib is used to make api calls.

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

export let idToken = ""; // idToken  variable to store tokenid
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
    .then(async (userCredentials) => {
      idToken = await userCredentials.user.getIdToken(true);
      console.log(`${email} Signed up successfully!`);
      //  console.log(`This is the tokenID: ${idToken}`);
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
    .then(async (userCredentials) => {
      console.log(`Signin for ${email} successfully`);
      navigation.navigate("MenuPage");
      idToken = await userCredentials.user.getIdToken(true);
      //    console.log(`This is the tokenID: ${idToken}`);
      menuData(email, idToken);
    })
    .catch((error) => {
      console.error(` Sign_In for user ${email} failed:`, error.message);
      alert(error);
    });
};

//export default signUp;

//below is the API_hub were we can constuct and make api calls

const menuData = async (email, idToken) => {
  const url = "http://192.168.0.188:8080/all/items";
  const data = {
    emailId: email,
  };
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error with Axios request:", error); // Logs the error message
    // Optionally, you can handle different error types here
    if (error.response) {
      // The request was made, but the server responded with a status code other than 2xx
      console.error("Response error:", error.response);
    } else if (error.request) {
      // The request was made, but no response was received
      console.error("Request error:", error.request);
    } else {
      // Something else triggered the error
      console.error("General error:", error.message);
    }
  }
};
