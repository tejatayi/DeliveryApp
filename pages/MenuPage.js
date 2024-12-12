import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { menuData } from "./FirebaseAuth";
import { ScrollView } from "react-native-gesture-handler";

export default function MenuPage({ navigation, route }) {
  const { email, idToken } = route.params;
  const [fetchMenuData, setFetchMenuData] = useState([]);
  const [resposeStatus, setResposeStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respose_object = await menuData(email, idToken);
        if (respose_object.status === 200) {
          setFetchMenuData(respose_object.data);
          setResposeStatus(true);
        } else {
          console.log(
            `API call to fetch data failed : ${respose_object._response}`
          );
          setResposeStatus(false);
        }
      } catch (error) {
        console.error("Error fetching menu data:", error);
        setResponseStatus(false);
      }
    };
    fetchData();
  }, []);
  const subCategories = [
    "Entrees",
    "Salads",
    "Beverages",
    "Appetizers",
    "Drinks",
    "Breads",
  ];
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        style={styles.subCategoryBar}
        showsHorizontalScrollIndicator={false}
      >
        {subCategories.map((category, index) => (
          <TouchableOpacity key={index}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {resposeStatus ? (
        <ScrollView style={styles.menuList}>
          {fetchMenuData.map((item, index) => (
            <View key={index} style={styles.menuItem}>
              <Text style={styles.itemName}>{item.itemName}</Text>
              <Text style={styles.itemPrice}>Price: ${item.price}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text>No menu data available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#060202",
  },
  subCategoryBar: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginRight: 10,
    backgroundColor: "#060202",
    borderRadius: 8,
    flexDirection: "row",
  },
  categoryText: {
    color: "#fff",
    fontSize: 13,
    marginRight: 20,
  },
  menuItem: {
    marginTop: 20,
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    backgroundColor: "#1c1c1c",
    shadowColor: "#000", // Adds a subtle shadow effect
    shadowOffset: { width: 0, height: 1 }, // Shadow position
    shadowOpacity: 0.3, // Shadow intensity
    shadowRadius: 2, // Shadow blur radius
    minHeight: 60,
  },
  itemName: {
    fontWeight: "bold",
    color: "#777",
  },
  itemPrice: {
    color: "#868686",
  },
  itemDescription: {
    color: "#868686",
  },
});
