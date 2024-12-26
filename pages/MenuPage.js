import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
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
          console.log(fetchMenuData);
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
              <Image
                source={{ uri: `${item.imageUrl}` }}
                style={styles.image}
              />
              <View style={styles.itemText}>
                <Text style={styles.itemName}>{item.itemName}</Text>
                <Text style={styles.itemPrice}>Price: ${item.price}</Text>
              </View>
              <TouchableOpacity style={styles.cartbutton}>
                <Text style={styles.itemName}>Add to cart</Text>
              </TouchableOpacity>
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
    paddingBottom: 9,
  },
  categoryText: {
    color: "#fff",
    fontSize: 13,
    marginRight: 20,
  },
  menuList: {
    flexGrow: 1,
  },
  image: {
    marginLeft: 3,
    width: 100,
    height: 100,
    borderRadius: 0,
    marginBottom: 0,
    marginRight: 6,
  },
  menuItem: {
    padding: 6,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#060202",
    shadowColor: "#000",
    borderBlockColor: "#868686",
    borderWidth: 0.3,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    minHeight: 60,
    marginRight: "150",
  },
  itemText: {
    marginTop: 10,
  },
  itemName: {
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  itemPrice: {
    marginTop: 2,
    color: "#868686",
  },
  itemDescription: {
    color: "#868686",
  },
  cartbutton: {
    position: "absolute",
    bottom: 1,
    right: 1,
  },
});
