// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDn7k_GmQfVaLCmvBoXGm0IKfRPcUYLetA",
  authDomain: "eeee-731da.firebaseapp.com",
  projectId: "eeee-731da",
  storageBucket: "eeee-731da.appspot.com",
  messagingSenderId: "280022506832",
  appId: "1:280022506832:web:b1159345459e1d89186055",
  measurementId: "G-Q50J8BX4B9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);