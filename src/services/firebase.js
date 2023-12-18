// Import the functions you need from the SDKs you need
import productsStore from '../data/productsStore'
import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs, doc, getDoc, query, where, addDoc, orderBy, writeBatch} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

export async function getData() {
    const productsCollectionRef = collection(db, 'products')

    const q = query (productsCollectionRef, orderBy('index'))
    const productsSnapshot = await getDocs (q)
    const arrayDocs = productsSnapshot.docs
    const dataDocs = arrayDocs.map ((doc) => {
        return {...doc.data(), id: doc.id}
    })
    return dataDocs
}

export async function getItemData(idURL) {
    const docRef = doc (db, 'products', idURL )
    const docSnap = await getDoc (docRef)
    return {id: docSnap.id, ...docSnap.data()}
}

export async function getCategoryData (idCategory) {
    const productsCollectionRef = collection (db,'products')
    const q = query (productsCollectionRef, where ('category', '==', idCategory))
    
    const productsSnapshot = await getDocs (q)
    const arrayDocs = productsSnapshot.docs
    const dataDocs = arrayDocs.map ((doc) => {
        return {...doc.data(), id: doc.id}
    })
    return dataDocs
}

export async function createOrder(data) {
    const ordersCollectionRef = collection(db, "orders");

  const response = await addDoc(ordersCollectionRef, data);
  return response.id;

}


export async function exportDataWithBatch() {
    const batch = writeBatch(db)
    const collectionRef = collection (db, 'products')
  
    for (let item of productsStore) {
      item.index = item.id;
      delete item.id;
      const docRef = doc(collectionRef)
      batch.set(docRef, item);
    }

    await batch.commit()
  }

  //Cuando hacemos orden de compra, hacer Update de cada elemento que estamos comprando

  export async function createOrderWithStockUpdate(data) {
    const ordersCollectionRef = collection(db, "orders");
    const batch = writeBatch(db);
    const { items } = data;
  
    for (let itemInCart of items) {
      const refDoc = doc(db, "products", itemInCart.id);
      const docSnap = await getDoc(refDoc);
  
      const { stock } = docSnap.data();
      console.log(stock);
  
      const stockToUpdate = stock - itemInCart.count;
      if (stockToUpdate < 0) {
        throw new Error(`No hay stock suficiente del producto: ${itemInCart.id}`);
      } else {
        const docRef = doc(db, "products", itemInCart.id);
        batch.update(docRef, { stock: stockToUpdate });
      }
    }
  
    await batch.commit();
    const response = await addDoc(ordersCollectionRef, data);
  
    return response.id;
  }