import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "./pages/SignUpPage.js";
import MenuPage from "./pages/MenuPage.js";
import { signIn } from "./pages/FirebaseAuth.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Home Screen or Login screen */}
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: false }} // this to hide the header
        />

        {/* Sign Up Screen */}
        <Stack.Screen
          name="SignUp"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MenuPage"
          component={MenuPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function LoginPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Image source={require("./assets/logo_sample.png")} style={styles.logo} />

      <TextInput
        style={styles.login_page_user_password} // username/ email/phone number
        placeholder="Email "
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.login_page_user_password}
        placeholder="Password" //password
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        style={signUpStyles.signUpButton}
        onPress={() => signIn(email, password, navigation)}
      >
        <Text style={signUpStyles.buttonText}> Sign In</Text>
      </TouchableOpacity>

      <View style={signUpStyles.signUpContainer}>
        <Text style={signUpStyles.newCustomerText}>New Customer?</Text>
        <TouchableOpacity
          style={signUpStyles.signUpButton}
          onPress={() => navigation.navigate("SignUp")} // the parameter is the name of the screen
        >
          <Text style={signUpStyles.buttonText}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#FFFFFF",
    backgroundColor: "#060202",
    alignItems: "center",
    justifyContent: "center",
  },
  login_page_user_password: {
    width: "80%",
    height: 45,
    fontWeight: "600",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#808080",
    marginBottom: 10,
    paddingLeft: 10,
    placeholderTextColor: "#FFFFFF",
  },

  logo: {
    // backgroundColor: "#FFFFFFs",
    width: 100, // Width of the logo image
    height: 100,
    marginBottom: 30,
    backgroundColor: "#060202",
    borderRadius: 14,
  },
  newCustomerText: {
    fontSize: 15,
    fontWeight: 1000,
  },
});

const signUpStyles = StyleSheet.create({
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
  },
  signUpButton: {
    backgroundColor: "#060202",
    marginLeft: "20",
    marginRight: "20",
    paddingLeft: "2",
    paddingRight: "4",
  },
  newCustomerText: {
    color: "#FFFFFF",
  },
  buttonText: {
    color: "#FFFFFF",
  },
});
