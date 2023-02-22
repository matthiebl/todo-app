// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDkigDLaDw_mj-0iaX-6BuSy5zuDRF0lPg',
    authDomain: 'mhiebl-todo.firebaseapp.com',
    projectId: 'mhiebl-todo',
    storageBucket: 'mhiebl-todo.appspot.com',
    messagingSenderId: '76012601756',
    appId: '1:76012601756:web:55031a626fa6d1b9030859',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const database = getFirestore(app)
