import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';


const firebaseApp=firebase.initializeApp({
  apiKey: "AIzaSyD0aYmD8wTRmXrlr0X0qsisrSFRyn2ZTec",
  authDomain: "todo-app-8ba1d.firebaseapp.com",
  projectId: "todo-app-8ba1d",
  storageBucket: "todo-app-8ba1d.appspot.com",
  messagingSenderId: "891772588121",
  appId: "1:891772588121:web:d28de08fe12f9964526148",
  measurementId: "G-BN508VLCZV"
})

const db=firebaseApp.firestore();

export default db;