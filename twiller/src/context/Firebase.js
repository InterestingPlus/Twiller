import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKH56k45T0wP4chgcY03toAFxJgDIcdSk",
  authDomain: "tiller-73adc.firebaseapp.com",
  projectId: "tiller-73adc",
  storageBucket: "tiller-73adc.firebasestorage.app",
  messagingSenderId: "354711962129",
  appId: "1:354711962129:web:0cba0792f39a59f411a7b0",
  measurementId: "G-44PYJ20NFY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
