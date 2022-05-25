import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import app from '../firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  let navigate = useNavigate();

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
        navigate('/');
      })
      .catch(error => {
        setLoginError(error.message)
      })
  };

  return (<>
    <Header />
    <div className="grid grid-rows-4 gap-4 justify-center bg-gray-700 mx-12 my-6 p-6 rounded-lg shadow-lg">
      <p className='text-2xl text-center mb-4'>
        Login
      </p>
      {loginError &&
        <p className='text-xl text-center mb-2 text-red-500'>
          {loginError}
        </p>
      }
      <input className='bg-slate-200 text-black px-4 py-2 rounded-lg' type='text' value={email} onChange={handleEmailInput} placeholder='Email' />
      <input className='bg-slate-200 text-black px-4 py-2 rounded-lg' type='password' value={password} onChange={handlePasswordInput} placeholder='password' />
      <button className='border border-grey bg-gray-700 rounded-full py-2' onClick={signIn}>Login</button>
      <button className='text-center text-slate-400' onClick={() => navigate('/register')}>Register?</button>
    </div>
    <Footer />
  </>);
};

export default Login;
