// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "image-uploader-br.firebaseapp.com",
  projectId: "image-uploader-br",
  storageBucket: "image-uploader-br.appspot.com",
  messagingSenderId: "459812083",
  appId: "1:459812083:web:57b0f134afeff65a469b86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);



