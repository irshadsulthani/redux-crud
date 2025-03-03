
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "redux-crud-90d9b.firebaseapp.com",
  projectId: "redux-crud-90d9b",
  storageBucket: "redux-crud-90d9b.firebasestorage.app",
  messagingSenderId: "208055312582",
  appId: "1:208055312582:web:eaa61ddf79ac416bdff7c7"
};


export const app = initializeApp(firebaseConfig);