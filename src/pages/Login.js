import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import app from '../firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth(app);

  function handleEmailInput(e) {
    setEmail(e.target.value);
  };

  function handlePasswordInput(e) {
    setPassword(e.target.value);
  };

  function signIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then(userData => {
        console.log(userData);
      });
  };

  return (<>
    <Header name={'joe'} />
    <input type='text' value={email} onChange={handleEmailInput} placeholder='Email' />
    <br />
    <input type='password' value={password} onChange={handlePasswordInput} placeholder='password' />
    <br />
    <button onClick={signIn}>Login</button>
    <Footer />
  </>)
};

export default Login;
