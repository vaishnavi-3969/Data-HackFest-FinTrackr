import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
    apiKey:process.env.FIREBASE_API_KEY,
    authDomain: "data-hackfest.firebaseapp.com",
    projectId: "data-hackfest",
    storageBucket: "data-hackfest.appspot.com",
    messagingSenderId: "94367962748",
    appId: "1:94367962748:web:2d63bde0cb425c7660dbf9",
    measurementId: "G-3MPB1FYCXG"
};

const app = initializeApp(firebaseConfig);

export default app;