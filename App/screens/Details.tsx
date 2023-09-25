import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import * as Contacts from "expo-contacts";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Details = ({ navigation }: RouterProps) => {
  const [contacts, setContacts] = useState([]);
  const [clickedContact, setClickedContact] = useState([]);
  const [characterImages, setCharacterImages] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.Name,
            Contacts.Fields.Image,
            Contacts.Fields.PhoneNumbers,
          ],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
      try {
        const storedContactsString = await SecureStore.getItemAsync(
          "clickedContacts"
        );
        if (storedContactsString) {
          const storedContacts = JSON.parse(storedContactsString);
          setClickedContact(storedContacts);
        }
      } catch (error) {
        console.error("Error retrieving clicked contacts:", error);
      }
    })();
  }, []);

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

  const handleContactPress = async (contact) => {
    setClickedContact([contact, ...clickedContact]);
    console.log(`Contact ${contact.name} pressed`);

    try {
      // Convert the clickedContact array to a string before storing
      const contactsString = JSON.stringify(clickedContact);
      await SecureStore.setItemAsync("clickedContacts", contactsString);
      navigation.navigate("Send Payments", { contact });
      // Navigate to the next screen
    } catch (error) {
      console.error("Error storing clicked contacts:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Recents</Text>
      </View>
      <FlatList
        data={clickedContact}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        renderItem={({ item }) => (
          <ScrollView style={styles.container}>
            <Image
              style={styles.image}
              source={{
                uri: characterImages.length > 0 ? characterImages[0] : "", // Use the first character image URL if available
              }}
            />
            <Text style={styles.name}>{item.name}</Text>
          </ScrollView>
        )}
      />
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Contacts</Text>
      </View>

      {contacts.map((contact, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => {
            handleContactPress(contact);
          }}
        >
          <View style={styles.contactInfo}>
            <Image
              style={styles.image}
              source={{
                uri: characterImages[index % characterImages.length], // Cycle through character images
              }}
            />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{contact.name}</Text>
              {contact.phoneNumbers &&
                contact.phoneNumbers.map((phoneNumber, index) => (
                  <Text key={index} style={styles.phoneNumber}>
                    {phoneNumber.number}
                  </Text>
                ))}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 0,
    borderColor: "#ccc",
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  phoneNumber: {
    fontSize: 16,
  },
});

export default Details;
