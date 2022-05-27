import app from '../firebase';
import { getAuth, signOut as _signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Header({ user }) {

  let navigate = useNavigate();
  const auth = getAuth(app);

  function signOut() {
    _signOut(auth).then(() => navigate('/login'));
  };

  return (
    <div className='px-6 pb-4'>
      <div className="p-4 text-center flex flex-row justify-between border border-grey rounded-lg p-6 bg-gray-700 shadow-lg">
        <img src='https://beachcoders.com/wp-content/uploads/2018/06/beach-coders-logo-web.png' alt='logo' width='150' />
        <p className='text-2xl text-slate-200'>Hello {user ? user.email : 'guest'}!</p>

        {user &&
          <button className='justify-self-end' onClick={() => signOut()}>Sign Out</button>
        }
      </div>
    </div>
  );
}
