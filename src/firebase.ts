import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD72H-CuKBfrGP5aHmBIUGFmpE4N9ahtvU",
    authDomain: "selftodo-682bc.firebaseapp.com",
    projectId: "selftodo-682bc",
    storageBucket: "selftodo-682bc.appspot.com",
    messagingSenderId: "8532688764",
    appId: "1:8532688764:web:2242dc9e4fe40252bcaef9"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export const auth = getAuth(app);
  export default db;