
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";

 
const firebaseConfig = {
    apiKey: "AIzaSyC_hLDPx6Gj8l615Mz37F1nA8yEZ8_aZyI",
    authDomain: "pengaduan-simrs-47679.firebaseapp.com",
    projectId: "pengaduan-simrs-47679",
    storageBucket: "pengaduan-simrs-47679.appspot.com",
    messagingSenderId: "307053127059",
    appId: "1:307053127059:web:a3fdf11ee788271b207466",
    measurementId: "G-F06B1C05WH"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);