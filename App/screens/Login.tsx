import {View,Text,StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView  } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../Firebaseconfig';
import { async } from '@firebase/util';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { NavigationProp } from '@react-navigation/native';
interface RouterProps {
    navigation: NavigationProp<any,any>;
}
const Login =({navigation}: RouterProps)=>{
    const [email, setEmail]= useState('');
    const [password,setpassword] =useState('');
    const [loading ,setLoading] =useState(false); 
    const auth =FIREBASE_AUTH;

    const signIn =async ()=> {
        setLoading(true);
        try{
            const response =await signInWithEmailAndPassword(auth,email,password);
            console.log(response);
            alert('Check your emails!');
        }catch (error){
            console.log(error);
            alert('Sign in failed: '+error.message);
            navigation.navigate('Giver');
            
        }finally {
            setLoading(false);
        }
    }
    const signUp =async ()=> {
        setLoading(true);
        try{
            const response =await createUserWithEmailAndPassword(auth,email,password);
            console.log(response);
            alert('Check your emails!');
        }catch (error){
            console.log(error);
            alert('Sign in failed: '+error.message);
        }finally {
            setLoading(false);
        }
    }



    return (
        <View style={ styles.container} >
            <Text style={{fontSize:39,color:'blue',fontWeight:'700',position:'absolute',top:150,paddingLeft:50}}>Hello There !</Text>
            <Text style={{fontSize:25,fontWeight:'700',position:'absolute',top:210,paddingLeft:50}}>Login</Text>
            <KeyboardAvoidingView behavior="padding">
            <TextInput value={email} style={styles.input} placeholder='Email' 
            autoCapitalize='none' onChangeText={(text)=>setEmail(text)}></TextInput>
            <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder='Password' 
            autoCapitalize='none' onChangeText={(text)=>setpassword(text)}></TextInput>
            
            { loading? (<ActivityIndicator size="large" color="#00000ff"/>
            ) : (<>
            <View style={{top:100}}>
            <Button color={'#003289'}  title='Login' onPress={signIn}/>
            <Text></Text>
            <Text style={{paddingLeft:20,color:'black',}} >Don't have an account  <Text  style={{fontWeight:'400',color:'#0222bf',borderBottomWidth:2}} onPress={()=> navigation.navigate('Signup')}>Signup  </Text></Text>
            </View>
            </>
             )}
            </KeyboardAvoidingView>
            
        </View>
        

    );
};



export default Login;
const styles =StyleSheet.create({
    container:{
        
        flex:1,
        justifyContent:'center',
        backgroundColor:'#fff',
        padding:50
    },
    input:{
        marginVertical:4,
        height: 50,
        borderWidth:0,
        borderBottomWidth:1,
        borderBottomColor:'#DBDBDB',
        borderRadius:4,
        padding:10,
        backgroundColor:'#fff',
        

    }
});