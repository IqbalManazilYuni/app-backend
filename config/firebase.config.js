// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyAYk34bvK504SUO64Hy3svbgs5Mz0Rn1mE",
  authDomain: "recruitlab-dsi.firebaseapp.com",
  projectId: "recruitlab-dsi",
  storageBucket: "recruitlab-dsi.appspot.com",
  messagingSenderId: "609414258107",
  appId: "1:609414258107:web:2dd9d81f86c135f115f89e",
  measurementId: "G-GTSDDQ6MZ3",
});

const storage = getStorage(firebaseConfig);
export default storage;
