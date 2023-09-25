import {View,Text,StyleSheet,Image, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, ImageBackground  } from 'react-native';
import React, { useState } from 'react';
import { async } from '@firebase/util';
import { NavigationProp } from '@react-navigation/native';
import Login from './Login';

interface RouterProps {
    navigation: NavigationProp<any,any>;
}
const Giver =({navigation}: RouterProps)=>{
    



    return (
       
        
        <View style={ styles.container} >
            <ImageBackground source={require('../../assets/xy.png')} style={{flexGrow:3}}>
            <Text style={{fontSize:50,fontWeight:'bold',color:'black',textAlign:'center',top:100,right:40}}>Giver</Text>
            <Text style={{fontSize:30,fontWeight:'600',color:'black',textAlign:'center',top:120,right:90}}>Banking in</Text>
            <Text style={{fontSize:30,fontWeight:'600',color:'black',textAlign:'center',top:130,right:80}}>your Pocket</Text>
            <View style={{top:600,}}>
            <Button color={'black'} title='Get Started' onPress={()=> navigation.navigate('Login')}/>
            </View>
            </ImageBackground>
        </View>
        
        

    );
};




export default Giver;
const styles =StyleSheet.create({
    container:{
        
        flex:1,
        justifyContent:'flex-start',
        backgroundColor:'#FFFFFF',

    },
    input:{
        marginVertical:4,
        height: 50,
        borderWidth:0,
        borderBottomWidth:2,
        borderRadius:4,
        padding:10,
        backgroundColor:'#fff',
        

    }
});