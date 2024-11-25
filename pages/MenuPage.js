import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function MenuPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Menu Page</Text>
      {/* Add other components as needed */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 20,
    color: "#000",
  },
});
