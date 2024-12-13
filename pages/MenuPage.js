import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { menuDataByCategory } from "./FirebaseAuth";
import { ScrollView } from "react-native-gesture-handler";

export default function MenuPage({ navigation, route }) {
  const { email, idToken } = route.params;
  const [fetchMenuData, setFetchMenuData] = useState([]);
  const [resposeStatus, setResposeStatus] = useState(false);
  const [fetchCategoryData, setFetchCategoryData] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respose_object = await menuDataByCategory(
          email,
          idToken,
          fetchCategoryData
        );
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
  }, [fetchCategoryData]);

  const subCategories = [
    "All",
    "Entrees",
    "Salads",
    "Desserts",
    "Appetizers",
    "Beverages",
  ];
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        style={styles.subCategoryBar}
        showsHorizontalScrollIndicator={false}
      >
        {subCategories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setFetchCategoryData(category)}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {resposeStatus ? (
        <ScrollView contentContainerStyle={styles.menuList}>
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
    alignItems: "flex-start",
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
  menuList: {
    flex: 1,
  },
  menuItem: {
    marginTop: 10,
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 90,
    borderWidth: 1,
    backgroundColor: "#060202",
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
