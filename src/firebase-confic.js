

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
const firebaseConfig = {

    /* NB uuri .inv faili key peidtmiseks */
    apiKey: "AIzaSyCkZciZBguaqmBkDoAXFusc5t8I0-OT15Y",
    authDomain: "e-shop2024.firebaseapp.com",
    projectId: "e-shop2024",
    storageBucket: "e-shop2024.appspot.com",
    messagingSenderId: "65525581395",
    appId: "1:65525581395:web:12ecb9c61f3ff81b1328a6",
    measurementId: "G-VE43GRE0W9"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app);

