/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSignup = async () => {
    const auth = getAuth();
    const db = getFirestore();
  
   

  
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
  
  
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
      const user = userCredential.user;
  
      await sendEmailVerification(user);
  
     
      await addDoc(collection(db, 'users'), {
        userId: user.uid,
        name,
        email,
        
      });
  
      console.log('User signed up successfully. Verification email sent. User document added.');
  
      navigation.navigate('Login');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.error('Error signing up:', errorCode, errorMessage);
    }
  };
  return (
    <View style={styles.rectangleView}>
      <Image source={require('./component/signup.png')} style={styles.loginstyle} />
      <Text style={styles.logintitle}>Signup</Text>

      <TextInput
        placeholder="Name"
        style={styles.rectangleView1}
        keyboardType="default"
        placeholderTextColor={'grey'}
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <TextInput
        placeholder="Email"
        style={styles.rectangleView1}
        keyboardType="email-address"
        placeholderTextColor={'grey'}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder="Password"
        style={styles.rectangleView1}
        secureTextEntry={true}
        placeholderTextColor={'grey'}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TextInput
        placeholder="Confirm Password"
        style={styles.rectangleView1}
        secureTextEntry={true}
        placeholderTextColor={'grey'}
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
      />
      <View style={styles.signupbutton}>
        <Pressable style={styles.signupbutton1} onPress={handleSignup}>
          <Text style={styles.signUp}>SIGN UP</Text>
        </Pressable>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({

  rectangleView: {
    backgroundColor: '#333C4B',
    flex: 1,
    width: '100%',
    height: '100%',
  },

  rectangleView1: {
    backgroundColor: '#E8EAED',
    width: '90%',
    height: 50,
    color: 'black',
    marginTop: 25,
    borderRadius: 15,
    marginLeft: 20,
    padding: 15,
    fontSize: 17,
  },

  logintitle: {
    fontSize: 40,
    fontWeight: '700',
    marginTop: 10,
    color: '#fff',
    textAlign: 'left',
    marginLeft: 30,
  },


  signUp: {
    top: '20%',
    left: '37.5%',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    position: 'absolute',
    },

    signupbutton1:
    {
    height: '25%',
    borderRadius: 10,
    marginTop:30,
    marginLeft:20,
    backgroundColor: '#eb7147',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
    width: 0,
    height: 10,

    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    position: 'absolute',
    width: '100%',
    },

    signupbutton: {
    flex: 1,
    height: 30,
    width: '90%',
    },

    loginstyle:{
      height:220,
      width:250,
      marginLeft:85,
      marginTop:20,
    },

});


// eslint-disable-next-line semi-spacing, eol-last
export default Signup ;