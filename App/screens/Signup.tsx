import {View,Text,StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, Alert  } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../Firebaseconfig';
import { async } from '@firebase/util';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { NavigationProp } from '@react-navigation/native';
interface RouterProps {
    navigation: NavigationProp<any,any>;
}

const Signup =({navigation}: RouterProps)=>{
    const [email, setEmail]= useState('');
    const [password,setpassword] =useState('');
    const [loading ,setLoading] =useState(false); 
    const auth =FIREBASE_AUTH;

    
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
            <Text style={{fontSize:25,fontWeight:'700',position:'absolute',top:210,paddingLeft:50}}>Create Account</Text>
            <KeyboardAvoidingView behavior="padding">
            <TextInput value={email} style={styles.input} placeholder='Email' 
            autoCapitalize='none' onChangeText={(text)=>setEmail(text)}></TextInput>
            <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder='Password' 
            autoCapitalize='none' onChangeText={(text)=>setpassword(text)}></TextInput>
            
             <View style={{top:100}}>
                <Text style={{textAlign:'center',top:1}}>By registering you are agreeing to our</Text>
             <Text style={{textAlign:'center',color:'#216BF7'}} onPress={()=>Alert.alert("Terms and Conditions","Do you approve")}>Terms and Conditions</Text>
            { loading? (<ActivityIndicator size="large" color="#00000ff"/>
            ) : (<>
            
            <Button  color={'#003289'} title='Submit' onPress={signUp} />
            </>
             )}
             <Text style={{color:'black',paddingLeft:'15%',}}>Already have an account?</Text>
             <Text style={{fontWeight:'400',color:'#0222bf',paddingLeft:"70%",bottom:17}} onPress={()=> navigation.navigate('Login')}>Sign in</Text>
             </View>
            </KeyboardAvoidingView>
            
        </View>
       
        

    );
};



export default Signup;
const styles =StyleSheet.create({
    container:{
        
        flex:1,
       justifyContent:'center',
        
        padding:50,
        backgroundColor:'#fff'
    },
    input:{
        marginVertical:4,
        height: 50,
        borderWidth:0,
        
        borderBottomColor:'#DBDBDB',
        borderBottomWidth:2,
        borderRadius:4,
        padding:10,
        backgroundColor:'#fff',
        

    }
});