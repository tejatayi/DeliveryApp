import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import GoogleButton from "react-google-button";
import signUp from "./FirebaseAuth";

export default function Signup({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.login_page_user}
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.login_page_user}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.login_page_user}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.login_page_user}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.login_page_user}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />

      <View style={styles.authentication_container}>
        <TouchableOpacity onPress={() => signUp(email, password)}>
          <Text style={styles.Signup_button}>SignUp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#060202",
  },
  login_page_user: {
    width: "80%",
    height: 45,
    fontWeight: "600",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#808080",
    marginBottom: 50,
    paddingLeft: 10,
    placeholderTextColor: "#FFFFFF",
  },
  Signup_button: {
    color: "#FFFFFF",
  },
});
