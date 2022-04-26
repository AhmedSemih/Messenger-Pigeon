import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCN1FIYZp_26hvXHcOmhU2VYb1T7-2GDQo",
  authDomain: "chatapp-6daa4.firebaseapp.com",
  databaseURL: "https://chatapp-6daa4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chatapp-6daa4",
  storageBucket: "chatapp-6daa4.appspot.com",
  messagingSenderId: "1098390891495",
  appId: "1:1098390891495:web:6bb583d57dd2f24fe9eb42",
  measurementId: "G-4XT8GJV7ZB"
};

export const FirebaseApp = () => initializeApp(firebaseConfig);
