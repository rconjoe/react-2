import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import Storefront from './pages/Storefront';
import Login from './pages/Login';
import Register from './pages/Register';
import app from './firebase';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

import './App.style.css'

function App({ user }) {

const db = getFirestore(app);

const [userState, setUserState] = useState({});

useEffect(() => {
  const userDocReference = doc(db, 'users', user.uid);
  onSnapshot(userDocReference, (doc) => {
    setUserState(doc.data());
  })
}, [])

  return (
    <div className='svg text-white'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home user={userState} />} />
          <Route path='/storefront/:id' element={<Storefront />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

