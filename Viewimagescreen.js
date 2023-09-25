import React from 'react';
import { View , ImageBackground, StyleSheet , Image , Text, Button } from 'react-native';
import Welcomescreen from './Welcomescreen';
 function Viewimagescreen({navigation}) {
    const goToWelcomeScreen = () => {
        navigation.navigate('Welcomescreen');
      };
    
    return(
    <View style={styles.background}>
        
        <Image  style={styles.image} source={require("./chair.jpg")}/>
        <View style={styles.right}></View>
        <View style={styles.left}></View>
        <Button title="click me" onPress={goToWelcomeScreen}/>
        
        </View>
    
  );
}

const styles = StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:'black',
        justifyContent:'center',
        alignItems:'flex-start'
    },
    image:{
        width:"100%",
        height:"60%",
        
        
    },
    text:{
        textAlign:'center',
        position:'absolute',
        top:170
    },
    right:{
        
        width:"10%",
        height:50,
        position:'absolute',
        top:50,
        left:10,
        
        backgroundColor:"chocolate",
        
    },
    left:{
        
        width:"10%",
        height:50,
        position:'absolute',
        top:50,
        right:10,
        
        backgroundColor:"gray",
        
    },
    
    
})

export default Viewimagescreen;