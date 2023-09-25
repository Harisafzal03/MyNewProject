import { NavigationProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import { FIREBASE_AUTH } from "../../Firebaseconfig";
import Details from "./Details";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const List = ({ navigation, route }) => {
  const [characterImages, setCharacterImages] = useState([]);

  const serializedTransactions = route.params?.transactions;
  const transactions = serializedTransactions;
  console.log(transactions, "trr");

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
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",

        backgroundColor: "#FFFFFF",
        padding: 16,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <ImageBackground
          source={require("../../assets/yz.jpg")}
        ></ImageBackground>
        <Button
          onPress={() => navigation.navigate("Details")}
          title="OpenDetails"
        />
        <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>
          Recent Transactions
        </Text>
        <FlatList
          data={transactions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                style={styles.cardImage}
                source={{
                  uri: characterImages[1 % characterImages.length],
                }}
              />
              <View style={styles.cardDetails}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardPhoneNumber}>{item.number}</Text>
                <Text style={styles.cardAmount}>Amount: {item.Amount}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default List;
const styles = {
  card: {
    top: 20,
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
    width: "100%",
  },
  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  cardDetails: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardPhoneNumber: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  cardAmount: {
    fontSize: 14,
    color: "#555",
  },
};
