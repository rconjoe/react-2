import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import app from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  root.render(
    <App user={user} />
  );
})

