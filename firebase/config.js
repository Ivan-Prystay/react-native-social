// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBL4MOh9HsWh7MLgVyL4vYPrCzQwuJ3ges",
  authDomain: "react-native-sociall.firebaseapp.com",
  projectId: "react-native-sociall",
  storageBucket: "react-native-sociall.appspot.com",
  messagingSenderId: "120020757004",
  appId: "1:120020757004:web:2b2f8b9043bb002f155c29",
  measurementId: "G-GYV20YDKGL",
  storageBucket: "gs://react-native-sociall.appspot.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { auth, db, storage };
