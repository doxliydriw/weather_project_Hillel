// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCOFomI6p-TeS1w-y8WrMTW26xSlmrSn5A",
    authDomain: "hillel-89bfe.firebaseapp.com",
    projectId: "hillel-89bfe",
    storageBucket: "hillel-89bfe.appspot.com",
    messagingSenderId: "939918470167",
    appId: "1:939918470167:web:73b1e95cfc81896c578052",
    measurementId: "G-833GCQLT10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);