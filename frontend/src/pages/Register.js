import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import app from '../firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [regError, setRegError] = useState('');

  let navigate = useNavigate();

  const auth = getAuth(app);

  function handleEmailInput(e) {
    setEmail(e.target.value);
  };

  function handlePasswordInput(e) {
    setPassword(e.target.value);
  };

  function register() {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userData => {
        navigate('/');
      })
      .catch(error => {
        setRegError(error.message);
        clearRegError();
      })
  };

  function clearRegError() {
    setTimeout(() => {
      setRegError('');
    }, 5000);
  }

  return (<>
    <Header />
    <div className="grid grid-rows-4 gap-4 justify-center bg-gray-700 mx-12 my-6 p-6 rounded-lg shadow-lg">
      <p className='text-2xl text-center mb-4'>
        Register
      </p>
      {regError &&
        <p className='text-xl text-center mb-2 text-red-500'>
          {regError}
        </p>
      }
      <input className='bg-slate-200 text-black px-4 py-2 rounded-lg' type='text' value={email} onChange={handleEmailInput} placeholder='Email' />
      <input className='bg-slate-200 text-black px-4 py-2 rounded-lg' type='password' value={password} onChange={handlePasswordInput} placeholder='password' />
      <button className='border border-grey bg-gray-700 rounded-full py-2' onClick={() => register()}>Register</button>
      <button className='text-center text-slate-400' onClick={() => navigate('/login')}>Login?</button>
    </div>
    <Footer />
  </>)
}
