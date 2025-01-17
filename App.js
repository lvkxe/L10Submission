import React, { useState, useEffect } from "react";
import {FlatList, StatusBar, Text, TextInput, View, StyleSheet, SafeAreaView,} from "react-native";

let originalData = []; // To store the original data

const App = () => {
  const [myData, setMyData] = useState([]); // State to manage the displayed data
  const [searchText, setSearchText] = useState(""); // State for search input

  // Fetch data from API
  useEffect(() => {
    fetch("https://mysafeinfo.com/api/data?list=autocompanies&format=json&case=default")
        .then((response) => response.json())
        .then((myJson) => {
          if (originalData.length < 1) {
            originalData = myJson; // Store the fetched data in originalData
            setMyData(myJson); // Set the data to be displayed
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to filter the data based on the search input
  const FilterData = (text) => {
    setSearchText(text); // Update the search text state
    if (text !== "") {
      const myFilteredData = originalData.filter((item) =>
          item.AutoManufacturer.toLowerCase().includes(text.toLowerCase())
      );
      setMyData(myFilteredData);
    } else {
      setMyData(originalData); // Reset to original data if input is empty
    }
  };

  // Function to render each item in the list
  const renderItem = ({ item }) => (
      <View style={styles.card}>
        <Text style={styles.cardText}>Manufacturer: {item.AutoManufacturer}</Text>
        <Text style={styles.cardText}>ID: {item.ID}</Text>
      </View>
  );

  return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#2a2a72" barStyle="light-content" />
        <Text style={styles.header}>Auto Manufacturers</Text>
        <TextInput
            style={styles.searchInput}
            placeholder="Search for a manufacturer..."
            value={searchText}
            onChangeText={(text) => FilterData(text)}
        />
        <FlatList
            data={myData}
            keyExtractor={(item) => item.ID.toString()}
            renderItem={renderItem}
        />
      </SafeAreaView>
  );
};

// Stylesheet for the application
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    paddingVertical: 15,
    backgroundColor: "#2a2a72",
    color: "#ffffff",
    borderRadius: 10,
    elevation: 5, // Shadow for modern effect
  },
  searchInput: {
    height: 45,
    marginVertical: 15,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 20,
    fontSize: 16,
    backgroundColor: "#f7f7f7",
  },
  card: {
    marginVertical: 12,
    padding: 20,
    borderRadius: 15,
    borderColor: "#ddd",
    borderWidth: 1,
    backgroundColor: "#ffffff",
  },
  cardText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 5,
  },
});

export default App;
