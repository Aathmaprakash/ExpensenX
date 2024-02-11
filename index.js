/* eslint-disable quotes */
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Updated import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT261uxMJkdr4TgixBz63CNOiwf5JayRM",
  authDomain: "expensenx.firebaseapp.com",
  projectId: "expensenx",
  storageBucket: "expensenx.appspot.com",
  messagingSenderId: "123959855481",
  appId: "1:123959855481:web:faefc7a4f7b6211d4c07a8",
  measurementId: "G-BCGS2L4S7E"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(); // Initialize Firestore without passing the app instance

// Example function to handle signup and store user data in Firestore
const handleSignup = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);

    // Store user data in Firestore
    const userDocRef = await addDoc(collection(db, 'users'), {
      userId: userCredential.user.uid,
      email,
      displayName,
      // Add more user data as needed
    });

    console.log('User signed up successfully. Verification email sent. User document added:', userDocRef.id);
  } catch (error) {
    console.error('Error signing up:', error.code, error.message);
  }
};

AppRegistry.registerComponent(appName, () => App);
