// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDlunLWrDzi1tLxDaQDj3liqGRgqgc5Oc",
  authDomain: "movies-669ff.firebaseapp.com",
  projectId: "movies-669ff",
  storageBucket: "movies-669ff.appspot.com",
  messagingSenderId: "141634500329",
  appId: "1:141634500329:web:e93f6dd1101b4ec6716278",
  measurementId: "G-2V0B3JPWQ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
