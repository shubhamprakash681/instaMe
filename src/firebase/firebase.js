import env from 'react-dotenv'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: env.REACT_APP_URI_API_KEY,
  authDomain: env.REACT_APP_URI_AUTH_DOMAIN,
  projectId: "instame-45c8b",
  storageBucket: env.REACT_APP_URI_STORAGE_BUCKET,
  messagingSenderId: "51703945639",
  appId: env.REACT_APP_URI_APP_ID,
  measurementId: "G-4GVK2PQ0MQ",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
