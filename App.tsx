import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet,Text,View } from "react-native";
import Login from './App/screens/Login';
import Signup from './App/screens/Signup';
import List from './App/screens/List';
import Details from "./App/screens/Details";
import Giver from "./App/screens/Giver";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./Firebaseconfig";
import Newscreen from "./App/screens/Newscreen";
import StripeApp from "./src/StripeApp";
import { StripeProvider } from "@stripe/stripe-react-native";

const Stack=createNativeStackNavigator();
const InsideStack=createNativeStackNavigator();

function InsideLayout() {
    return (
        <InsideStack.Navigator>
            <InsideStack.Screen name="SelectPayment" component={List}/>
            <InsideStack.Screen name="Details" component={Details}/>
            
        </InsideStack.Navigator>
    );
}
export default function App(){
    const [user,setUser] =useState<User | null>(null);

    useEffect(()=>{
        onAuthStateChanged(FIREBASE_AUTH,(user)=>{
            console.log('user',user);
            setUser(user);
        });
        },[]);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                {user ? (
                    <Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown: false }} />

                ) : (
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

                )}

                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                <Stack.Screen name="Send Payments" component={Newscreen} options={{ headerShown: true }} />
                <Stack.Screen name="Giver" component={Giver} options={{ headerShown: false }} />
                <Stack.Screen name="Stripe" component={StripeApp} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
        
        

    );
}

