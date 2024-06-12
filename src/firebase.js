import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCDg3rEFIVLueBFCm3zDtuZQnM1B0_kLMo",
  authDomain: "eeee-e75c9.firebaseapp.com",
  projectId: "eeee-e75c9",
  storageBucket: "eeee-e75c9.appspot.com",
  messagingSenderId: "589198895448",
  appId: "1:589198895448:web:7e45f45ad7bfefa1fc9d2d",
  measurementId: "G-J0X59J3JNX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };