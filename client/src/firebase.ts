// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-jerryestate.firebaseapp.com",
  projectId: "mern-jerryestate",
  storageBucket: "mern-jerryestate.appspot.com",
  messagingSenderId: "113172061080",
  appId: "1:113172061080:web:9745a0d39e0e5659efe9ed",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
