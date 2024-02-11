/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Login from './loginexpenses';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const Forgetpassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    const auth = getAuth();

    // Validate email before sending reset link
    if (!email) {
      // Handle empty email, for example, show an error message
      console.error("Email cannot be empty");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Password reset email sent successfully.');
        // You can add a message to inform the user that the reset email has been sent
      })
      .catch((error) => {
        // Handle errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error sending reset email:', errorCode, errorMessage);
        // You can display an error message to the user if needed
        // For example, set an error state
        // setError(errorMessage);
      });
  };

  return (
    <View style={styles.index}>
      <View>
        <Image source={require('./component/forget.png')} style={styles.loginstyle} />
        <Text style={styles.forgettitle}>Forget Password</Text>
      </View>

      <View>
        <Text style={styles.line}>To reset your password, please enter the correct Email ID.</Text>
      </View>

      <View style={styles.card}>
        <TextInput
          placeholder="Email"
          style={styles.rectangleView1}
          keyboardType="email-address"
          placeholderTextColor={'grey'}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
      
      <View style={styles.signupbutton}>
        <Pressable style={styles.signupbutton1} onPress={handleResetPassword}>
          <Text style={styles.signUp}>SUBMIT</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  index: {
    backgroundColor: '#333C4B',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  forgettitle:{
    fontSize: 40,

    marginTop: 20,
    color: '#fff',
    textAlign: 'left',
    marginLeft: 30,
  },
  line:{
    color:'white',
    fontSize:15,
    paddingTop:10,
    marginLeft:30,
    fontWeight:'600',
  },

      rectangleView1: {
        backgroundColor: 'white',
        width: '90%',
        height: 50,
        marginTop: 30,
        borderRadius: 15,
        marginLeft: 20,
        color: 'black',
        padding: 15,
        fontSize: 17,
      },
      buttonContainer: {
       height:150,
       width:'90%',
       borderRadius:20,
       paddingTop:40,
       marginLeft:20,
       overflow:'hidden',
       fontSize:50,



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
        height: '13%',
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
            marginTop:40,
          },


});

export default Forgetpassword;
