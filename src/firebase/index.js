// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-q5Vp6Rovi434O5pKIpYWytR20vfbSGI",
  authDomain: "twiiter-clone-joeuni.firebaseapp.com",
  projectId: "twiiter-clone-joeuni",
  storageBucket: "twiiter-clone-joeuni.appspot.com",
  messagingSenderId: "24764184539",
  appId: "1:24764184539:web:6981eeb91247ba6028d9fe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//인증
const auth = getAuth(app);

//파이어스토어
const db = getFirestore(app);

//스토리지
const storage = getStorage(app);

export { auth, db, storage };
