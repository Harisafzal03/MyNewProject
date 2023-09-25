// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYzRfeKVb0WFSQ0hNVPmPLsugEhVuLkss",
  authDomain: "giver-15081.firebaseapp.com",
  projectId: "giver-15081",
  storageBucket: "giver-15081.appspot.com",
  messagingSenderId: "526165745324",
  appId: "1:526165745324:web:81ac0b97a5cc7677dcc909",
  measurementId: "G-M1YMRGHT97"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP );
export const FIRESTORE_DB = getFirestore(FIREBASE_APP );
