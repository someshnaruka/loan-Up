// Import the functions you need from the SDKs you need
import {getApp,getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuKT7wuhWOVSIQca0bC65-hMneEmoHCVs",
  authDomain: "loanup.firebaseapp.com",
  projectId: "loanup",
  storageBucket: "loanup.appspot.com",
  messagingSenderId: "401199418949",
  appId: "1:401199418949:web:13bd3d343466bab2e99d2c"
};

// Initialize Firebase

const app = getApps.length>0 ? getApp() :initializeApp(firebaseConfig);
export {app};