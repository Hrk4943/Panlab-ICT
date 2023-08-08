import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firebase'  
import 'firebase/storage'

const firebaseDataBase = {
    apiKey: "AIzaSyB-dX1PjfmpsBzJgavFbAtAxQelBttEV_Y",
    authDomain: "olx-demo-c818f.firebaseapp.com",
    projectId: "olx-demo-c818f",
    storageBucket: "olx-demo-c818f.appspot.com",
    messagingSenderId: "607105036237",
    appId: "1:607105036237:web:a5c07278a41a40b48d9e84",
    measurementId: "G-9PJ0FW0Q6P"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseDataBase);
}

export const firestore = firebase.firestore();
