import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import List from "./List";
import * as SecureStore from "expo-secure-store";
import { NavigationProp } from "@react-navigation/native";
interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Newscreen = ({ navigation, route }) => {
  const { contact } = route.params;
  const [characterImages, setCharacterImages] = useState([]);
  const [Amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const serializedTransactions = JSON.stringify(transactions);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "https://rickandmortyapi.com/api/character"
        );
        const characters = response.data.results;
        const imageUrls = characters.map((character) => character.image);
        setCharacterImages(imageUrls);
      } catch (error) {
        console.error("Error fetching character images:", error);
      }

      try {
        const storedTransactionsString = await SecureStore.getItemAsync(
          "transactions"
        );
        if (storedTransactionsString) {
          const storedTransactions = JSON.parse(storedTransactionsString);
          setTransactions(storedTransactions);
        }
      } catch (error) {
        console.error("Error retrieving transactions:", error);
      }
    })();
  }, []);

  const handleSave = async () => {
    if (Amount && contact.name && contact.phoneNumbers[0].number) {
      const newTransaction = {
        Amount,
        name: contact.name,
        number: contact.phoneNumbers[0].number,
      };
      setTransactions([...transactions, newTransaction]);

      try {
        const transactionsString = JSON.stringify([
          ...transactions,
          newTransaction,
        ]);
        await SecureStore.setItemAsync("transactions", transactionsString);
      } catch (error) {
        console.error("Error storing transactions:", error);
      }

      // Reset the Amount field after saving
      setAmount("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image
          style={styles.image}
          source={{
            uri: characterImages[1 % characterImages.length], // Cycle through character images
          }}
        />
        <Text style={{ fontSize: 18, fontWeight: "400" }}>{contact.name}</Text>
        <Text style={{ fontSize: 12, fontWeight: "400", color: "#606060" }}>
          {contact.phoneNumbers[0].number}
        </Text>
      </View>
      <View style={{ width: "70%" }}>
        <TextInput
          value={Amount}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="numeric"
          onChangeText={(text) => setAmount(text)}
          placeholder="Enter Amount"
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          handleSave();
          navigation.navigate("SelectPayment", {
            navigation,
            transactions: serializedTransactions,
          });
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "flex-start",

    backgroundColor: "#FFFFFF",
    padding: 16,
  },

  button: {
    top: 20,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "blue",
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    top: 20,
    height: 50,
    borderWidth: 0,
    borderBottomWidth: 2,
    left: 50,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  image: {
    width: 70,
    height: 70,

    borderRadius: 35,
    marginBottom: 10,
  },
};

export default Newscreen;
