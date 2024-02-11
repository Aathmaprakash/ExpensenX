/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Image, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Toast from 'react-native-toast-message'; // Import the Toast component

const Login = () => {
  const navigation = useNavigation();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [userId, setUserId] = useState(null);

  const handleLogin = () => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUserId(user.uid);

        console.log('User signed in:', user);
        navigation.navigate('Dashboard', { userId: user.uid });

        // Show toast message
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Login Successful',
          visibilityTime: 3000,
          autoHide: true,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error signing in:', errorCode, errorMessage);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.index}
    >
      <View style={styles.index}>
        <Image source={require('./component/loginImage.png')} style={styles.loginstyle} />
        <Text style={styles.logintitle}>Login</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor={'grey'}
          style={styles.rectangleView1}
          keyboardType="email-address"
          onChangeText={(text) => setemail(text)}
          value={email}
        />
        
        <TextInput
          placeholder="Password"
          style={styles.rectangleView1}
          placeholderTextColor={'grey'}
          keyboardType="default"
          secureTextEntry={true}
          onChangeText={(text) => setpassword(text)}
          value={password}
        />
        <View style={styles.signupbutton}>
          <Pressable style={styles.signupbutton1} onPress={handleLogin}>
            <Text style={styles.signUp}>LOGIN</Text>
          </Pressable>
        </View>
        <View style={styles.linkContainer1}>
          <Pressable onPress={() => navigation.navigate('Forgetpassword')}>
            <Text style={styles.linkText}>Forget Password?</Text>
          </Pressable>
        </View>
        <View style={styles.linkContainer1}>
          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.linkText}>Don't have an account? Signup</Text>
          </Pressable>
        </View>
      </View>
      {/* Add the Toast component at the root level of your component */}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  index: {
    flex: 1,
    backgroundColor: '#333C4B',
  },

  rectangleView1: {
    backgroundColor: '#E8EAED',
    width: '90%',
    height: 50,
    marginTop: 30,
    borderRadius: 15,
    marginLeft: 20,
    overflow: 'hidden',
    padding: 15,
    color: 'black',
    fontSize: 17,
  },

  loginstyle: {
    height: 220,
    width: 250,
    marginLeft: 85,
    marginTop: 20,
  },

  logintitle: {
    fontSize: 40,
    color: 'white',
    marginTop: 30,
    marginLeft: 30,
  },

  signupbutton: {
    flex: 1,
    height: 30,
    width: '90%',
  },

  signupbutton1: {
    height: '23%',
    borderRadius: 10,
    marginTop: 30,
    marginLeft: 20,
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

  signUp: {
    fontSize: 20,
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10,
  },

  linkContainer1: {
    alignItems: 'center',
    paddingBottom: 40,
  },

  linkText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default Login;
