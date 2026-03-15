import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "authexamnotes-c5599.firebaseapp.com",
  projectId: "authexamnotes-c5599",
  storageBucket: "authexamnotes-c5599.firebasestorage.app",
  messagingSenderId: "450502213850",
  appId: "1:450502213850:web:6740bc1c10c9c7b3f265e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };