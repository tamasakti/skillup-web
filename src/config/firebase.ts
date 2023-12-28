// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGEID,
    appId: import.meta.env.VITE_REACT_APP_FIREBASE_APPID
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(initializeApp(firebaseConfig))