
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
//   authDomain: "authexamnotes.firebaseapp.com",
//   projectId: "authexamnotes",
//   storageBucket: "authexamnotes.firebasestorage.app",
//   messagingSenderId: "198091553006",
//   appId: "1:198091553006:web:cd719d4ee1ebf391139bff"
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "examnotesai-38bf2.firebaseapp.com",
  projectId: "examnotesai-38bf2",
  storageBucket: "examnotesai-38bf2.firebasestorage.app",
  messagingSenderId: "1042281140401",
  appId: "1:1042281140401:web:0e7b76060da2c657289290",
  measurementId: "G-L5CHYNHR9D"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}