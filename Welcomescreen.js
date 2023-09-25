import React from 'react';
import { View , ImageBackground, StyleSheet , Image , Text, Button } from 'react-native';
 function Welcomescreen(props) {
    return(
    <ImageBackground  style={styles.background} 
    source={require("./background.jpg")} >
        
            <Image  style={styles.image} source={require("./logo-red.png")}/>
        
        <Text style={styles.text}>Sell What You Dont't Need</Text>
        <View style={styles.login}></View>
        <View style={styles.regiter}  ></View>
    
  </ImageBackground>);
}

const styles = StyleSheet.create({
    background:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center'
    },
    image:{
        width:100,
        height:100,
        position:'absolute' ,
        top:70, 
    },
    text:{
        textAlign:'center',
        position:'absolute',
        top:170
    },
    login:{
        alignItems:'flex-start',
        width:"100%",
        height:70,
        backgroundColor:"red",
        
    },
    regiter:{
        alignItems:'flex-start',
        width:"100%",
        height:70,
        backgroundColor:"tomato",
        
    }
    
})

export default Welcomescreen;