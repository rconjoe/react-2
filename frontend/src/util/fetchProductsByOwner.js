import app from '../firebase.js';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const db = getFirestore(app);

export default async function fetchProductsByOwner(uid) {
  const productsCollection = collection(db, 'products');
  const productsQuery = query(productsCollection, where('owner', '==', uid))
  const _products = await getDocs(productsQuery);

  if (!_products.docs.length === 0) {
    return 'No products found for this user!'
  }

  let products = [];

  _products.docs.forEach(doc => {
    products.push(doc.data());
  })

  return products;

};
