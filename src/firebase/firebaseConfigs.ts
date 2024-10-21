// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCby7ZsnU778dBd-bqGvuTX1JNvirrTRVM",
  authDomain: "vaishnani-family.firebaseapp.com",
  projectId: "vaishnani-family",
  storageBucket: "vaishnani-family.appspot.com",
  messagingSenderId: "356401109579",
  appId: "1:356401109579:web:1106f39478d939e8dacbce",
  measurementId: "G-0FX4PJBD5P",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDb = getFirestore(firebaseApp);
export const firebaseAnalytics = getAnalytics(firebaseApp);
