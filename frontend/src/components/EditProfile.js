import React, { useState, useEffect } from 'react';
import app from '../firebase';
import { getFirestore, doc, updateDoc } from 'firebase/firestore'

export default function EditProfile({user}) {

  const db = getFirestore(app);

  const [ usernameState, setUsernameState ] = useState('');
  const [ usernameMessage, setUsernameMessage ] = useState('');

  useEffect(() => {
    if (user.username) {
      setUsernameState(user.username)
    }
  }, [])

  function handleUsernameInput(e) {
    setUsernameState(e.target.value);
  }

  function saveUsername() {
    if (usernameState === '') {
      setUsernameMessage({
        type: 'error',
        message: 'Username must not be blank',
      });
      return clearUsernameMessage();
    }
    updateDoc(doc(db, 'users', user.uid), {
      username: usernameState,
    })
    .then(() => {
      setUsernameMessage({type: 'success', message: 'Username saved.'})
      clearUsernameMessage();
    })
    .catch(err => {
      setUsernameMessage({type: 'error', message: 'Error saving username.'})
      clearUsernameMessage();
    })
  }

  function clearUsernameMessage() {
    setTimeout(() => {
      setUsernameMessage('')
    }, 5000)
  }

  return (<>
      <div className="flex flex-col gap-4 m-6 place-items-center bg-gray-700 rounded-lg">
      <p className='text-2xl text-center'>
        Profile
      </p>
      <div className='flex flex-row gap-2 justify-center'>
        <p className='pt-3'>Username:</p>
        <input className='bg-slate-200 text-black px-4 py-2 rounded-lg shadow' type='text' value={usernameState} onChange={handleUsernameInput} placeholder='username' />
      </div>
        {usernameMessage && 
          <p className={(usernameMessage.type === 'error') ? 'text-red-500' : 'text-green-600'}>{usernameMessage.message}</p>
        }
      <button className='w-40 border border-grey bg-gray-600 rounded-full py-1 shadow' onClick={saveUsername}>Save</button>
    </div>
  </>)
}
