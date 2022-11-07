import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBqk75SR-M7gFESsTHcvYyOjiI3f_F19Ks',
  authDomain: 'to-do-list-5d237.firebaseapp.com',
  projectId: 'to-do-list-5d237',
  storageBucket: 'to-do-list-5d237.appspot.com',
  messagingSenderId: '1079490598168',
  appId: '1:1079490598168:web:55dce045592e8a99ebfa6d'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
