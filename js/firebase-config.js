import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAanrNlQLGuNFPcKJWOlIo_OCZLHLsPnew",
  authDomain: "famous-vista-302812.firebaseapp.com",
  projectId: "famous-vista-302812",
  storageBucket: "famous-vista-302812.firebasestorage.app",
  messagingSenderId: "991142436071",
  appId: "1:991142436071:web:8c81b9b86007db8176d642",
  measurementId: "G-6NDQ5Y7S1D"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
