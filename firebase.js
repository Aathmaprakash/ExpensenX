// firebase.js
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  // Your Firebase configuration

  apiKey: "AIzaSyAR9Nq-mBu_CVJcb_bM6th7tj-I0WYdg4I",
  authDomain: "extensestracker.firebaseapp.com",
  databaseURL: "https://extensestracker-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "extensestracker",
  storageBucket: "extensestracker.appspot.com",
  messagingSenderId: "657101580945",
  appId: "1:657101580945:web:002448162d67c282892d30",
  measurementId: "G-0SH905W9K4",
};

const app = initializeApp(firebaseConfig);

// Check if analytics is supported before initializing
if (isSupported()) {
  const analytics = getAnalytics(app);
}

export default app;
