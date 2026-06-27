import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOFNP7GG3JTg9CkuGJUafKwR8JTWkVf-E",
  authDomain: "investiq-6d5dc.firebaseapp.com",
  projectId: "investiq-6d5dc",
  storageBucket: "investiq-6d5dc.firebasestorage.app",
  messagingSenderId: "469442240829",
  appId: "1:469442240829:web:398e44838a84e33d11a554",
  measurementId: "G-L6104WE41G",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
