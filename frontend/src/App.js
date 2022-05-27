import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './pages/Home';
import Storefront from './pages/Storefront';
import Login from './pages/Login';
import Register from './pages/Register';
import app from './firebase';
import { getFirestore, doc, collection, query, where, onSnapshot } from 'firebase/firestore';

import './App.style.css'

function App({ user }) {

  const db = getFirestore(app);

  const [userState, setUserState] = useState(null);
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (user) {
      const userDocReference = doc(db, 'users', user.uid);
      const productsCollectionReference = query(collection(db, 'products'), where('owner', '==', user.uid));

      onSnapshot(userDocReference, (doc) => {
        setUserState(doc.data());
      })

      onSnapshot(productsCollectionReference, (snapshot) => {
        setProducts([]);
        snapshot.forEach(doc => {
          setProducts(p => [...p, doc.data()])
        })
      })
    }
    else {
      setUserState(null);
      setProducts([]);
    }
  }, [])

  return (
    <div className='svg text-white p-6'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={userState ? <Home user={userState} products={products} /> : <Login />} />
          <Route path='/storefront/:id' element={<Storefront />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

