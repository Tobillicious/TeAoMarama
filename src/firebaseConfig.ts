// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add your own Firebase configuration
// For more information on how to get this, visit: https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyCRkpICJx9lXq6ggNJFjjMVB93l5cVGyp8",
  authDomain: "teao-marama.firebaseapp.com",
  projectId: "teao-marama",
  storageBucket: "teao-marama.appspot.com",
  messagingSenderId: "28147937673",
  appId: "YOUR_APP_ID" // Replace with your actual App ID from Firebase console
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
