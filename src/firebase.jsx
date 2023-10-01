import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBxYfcmrCdtqteIeybObn28nEZNSOcO1-Y",
  authDomain: "disney-clone-4c6f8.firebaseapp.com",
  projectId: "disney-clone-4c6f8",
  storageBucket: "disney-clone-4c6f8.appspot.com",
  messagingSenderId: "624236264210",
  appId: "1:624236264210:web:1972f4df1f6966f3ac11cb"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app)
export const GoogleProvider = new GoogleAuthProvider()
const db = getFirestore(app)

export {db}
