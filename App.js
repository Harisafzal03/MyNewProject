import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcomescreen from './Welcomescreen';
import Viewimagescreen from './Viewimagescreen';

const Stack = createStackNavigator();

export default function App() {
  
  
  return    (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Viewimagescreen"
        component={Viewimagescreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Welcomescreen" component={Welcomescreen} />
    </Stack.Navigator>
  </NavigationContainer>
  ) ;
}

const styles = StyleSheet.create({
  container: {
    
    
    
    // paddingTop: Platform.OS==="android"?StatusBar.currentHeight:0,
  },
  Image:{
    
    flex: 1,
    flexGrow:1,
    resizeMode: 'cover',
    justifyContent: 'center',
  }
});