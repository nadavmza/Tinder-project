// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvBxcg6Uar5sjmDvSdTvmxxlJ5B_7NlAY",
  authDomain: "tinder-3a4ac.firebaseapp.com",
  projectId: "tinder-3a4ac",
  storageBucket: "tinder-3a4ac.appspot.com",
  messagingSenderId: "551241887947",
  appId: "1:551241887947:web:a95737b58fe39c33ff6b4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth();
const db=getFirestore();

export {auth,db}