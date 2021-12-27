import { collection, doc, setDoc } from "@firebase/firestore";

const { db } = require("./firebase");
// import { collection, getDocs, addDoc, updateDoc, deleteDoc, onSnapshot, query, setDoc, doc, where, } from "firebase/firestore";
// import { dataPegawai } from "services/Text/GlobalText";


// export const SIM = {
//     root: 'service',
//     app: "app",

// }

// export const collectionSIM = collection(db, SIM.root, SIM.app);


// const usersCollectionRef = collection(db, "service");
// const createUser = async () => {
//     await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
// };


// export const addToFirebase = async () => {

//     var obj = {
//         name: "Jaka Tingkir",
//     }
//     await setDoc(collectionEB, obj);

// };


// export const updateFirebase = async () => {
//     await setDoc(collectionSIM, { rand: Math.random() }, { merge: true });

    // const reff = doc(db, SIM.root);
    // setDoc(reff, { rand: Math.random() }, { merge: true });



