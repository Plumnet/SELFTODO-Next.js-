import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD72H-CuKBfrGP5aHmBIUGFmpE4N9ahtvU",
  authDomain: "selftodo-682bc.firebaseapp.com",
  projectId: "selftodo-682bc",
  storageBucket: "selftodo-682bc.firebasestorage.app",
  messagingSenderId: "8532688764",
  appId: "1:8532688764:web:2242dc9e4fe40252bcaef9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export const auth = getAuth(app);
  export default db;