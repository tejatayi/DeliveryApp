import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getIdToken,
} from "firebase/auth";
import { useState } from "react";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"; // this lib is used to make api calls.
import { firebaseConfig } from "../config/firebaseConfig";

//const [user_authorized, setuser_authorized] = useState(false);

// Initialize Firebase if not already initialized
export const signUp = (email, password, navigation) => {
  let app;
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig); // If no app is initialized, initialize the app
  } else {
    app = getApp(); //If Firebase is already initialized, use the existing app,get the default app
  }
  const auth = getAuth(app); // Get Firebase Authentication instance
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredentials) => {
      let idToken = await userCredentials.user.getIdToken(true);
      console.log(`${email} Signed up successfully!`);
      //  console.log(`This is the tokenID: ${idToken}`);
      navigation.navigate("MenuPage", { email, idToken });
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

      let idToken = await userCredentials.user.getIdToken(true);
      navigation.navigate("MenuPage", { email, idToken });
    })
    .catch((error) => {
      console.error(` Sign_In for user ${email} failed:`, error.message);
      alert(error);
    });
};

//export default signUp;

//below is the API_hub were we can constuct and make api calls

export const menuDataByCategory = async (email, idToken, category) => {
  console.log("menuData function called");
  console.log(`This is the token in menudata function ${idToken}`);
  const url = `http://192.168.0.16:8080/items/${category}`;
  try {
    const menuData_response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    });
    //console.log(menuData_response.data);
    return menuData_response;
  } catch (error) {
    console.error("Error with Axios request:", error); // Logs the error message
    // Optionally, you can handle different error types here
    if (error.menuData_response) {
      console.error("Response error:", error.menuData_response);
    } else if (error.request) {
      console.error("Request error:", error.request);
    } else {
      console.error("General error:", error.message);
    }
    return null;
  }
};
