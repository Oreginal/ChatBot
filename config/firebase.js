// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAISYngCAuQMmf_SCP3k6gPoftBgsschrQ",
  authDomain: "chatbotdb-acbf9.firebaseapp.com",
  projectId: "chatbotdb-acbf9",
  storageBucket: "chatbotdb-acbf9.appspot.com",
  messagingSenderId: "377318141741",
  appId: "1:377318141741:web:a613a31ce732477301eda4"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
