//Para exportar los datos de forma local hacia Firebase

import { initializeApp } from "firebase/app";
import {getFirestore, collection, addDoc, writeBatch} from 'firebase/firestore'
import productsStore from '../data/productsStore'


const firebaseConfig = {
    apiKey: "AIzaSyAhr8GynbRLHefG6sfkdgiiCkVmwJ4_D7c",
    authDomain: "catastore-60628.firebaseapp.com",
    projectId: "catastore-60628",
    storageBucket: "catastore-60628.appspot.com",
    messagingSenderId: "1024998918992",
    appId: "1:1024998918992:web:056169899cd5a8aad27a55"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp)

  export async function exportData() {
    const productsCollectionRef = collection(db, "products");
  
    for (let item of productsStore) {
      item.index = item.id;
      delete item.id;
      const res = await addDoc(productsCollectionRef, item);
      console.log("Documento creado:", res.id);
    }
  }

