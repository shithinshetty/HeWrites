// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "hewrites-e1ce1.firebaseapp.com",
  projectId: "hewrites-e1ce1",
  storageBucket: "hewrites-e1ce1.appspot.com",
  messagingSenderId: "744188281961",
  appId: "1:744188281961:web:064e8bb74257b3a05c4ef8",
  measurementId: "G-RX6B0Y2QR9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
