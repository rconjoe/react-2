import React, { useState } from 'react';
import app from '../firebase';
import { getFirestore, doc, updateDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { CheckIcon } from '@heroicons/react/outline';

export default function EditProfile({ user }) {

  const db = getFirestore(app);
  const storage = getStorage(app);

  const [usernameState, setUsernameState] = useState('');
  const [bioState, setBioState] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState('');

  function handleUsernameInput(e) {
    setUsernameState(e.target.value);
  }

  function saveUsername() {
    if (usernameState === '') {
      setInfoMessage({
        type: 'error',
        message: 'Username must not be blank',
      });
      return clearInfoMessage();
    }
    updateDoc(doc(db, 'users', user.uid), {
      username: usernameState,
    })
      .then(() => {
        setInfoMessage({ type: 'success', message: 'Username saved.' })
        clearInfoMessage();
      })
      .catch(err => {
        setInfoMessage({ type: 'error', message: 'Error saving username.' })
        clearInfoMessage();
      })
  }

  function saveBio() {
    if (bioState === '') {
      setInfoMessage({
        type: 'error',
        message: 'Bio must not be blank',
      });
      return clearInfoMessage();
    }
    updateDoc(doc(db, 'users', user.uid), {
      bio: bioState,
    })
      .then(() => {
        setInfoMessage({ type: 'success', message: 'Bio saved.' })
        clearInfoMessage();
      })
      .catch(err => {
        setInfoMessage({ type: 'error', message: 'Error saving bio.' })
        clearInfoMessage();
      })
  }

  function clearInfoMessage() {
    setTimeout(() => {
      setInfoMessage('')
    }, 5000)
  }

  function uploadProfilePhoto() {
    if (selectedFile === null) {
      setInfoMessage({ type: 'error', message: 'Please choose a file first.' });
      return clearInfoMessage();
    };
    const profilePhotoRef = ref(storage, `profile-photos/${user.uid}-${selectedFile.name}`)
    uploadBytes(profilePhotoRef, selectedFile)
      .then((result) => {
        getDownloadURL(result.ref)
          .then((downloadURL) => {
            updateDoc(doc(db, 'users', user.uid), {
              profilePhoto: downloadURL
            })
              .then(() => {
                setInfoMessage({ type: 'success', message: 'File uploaded!' });
                return clearInfoMessage();
              })
              .catch(error => {
                setInfoMessage({ type: 'error', message: error.message });
                return clearInfoMessage();
              })
          })
          .catch(error => {
            setInfoMessage({ type: 'error', message: error.message });
            return clearInfoMessage();
          })
      })
      .catch(error => {
        setInfoMessage({ type: 'error', message: error.message });
        return clearInfoMessage();
      })
  }

  return (<>
    <div className="flex flex-col gap-6 mx-6 place-items-center bg-gray-700 rounded-lg overflow-visible flex-wrap">
      <p className='text-2xl text-center'>
        Profile
      </p>
      <div className='flex flex-row gap-4 border border-solid border-slate-600 rounded-lg shadow py-8 px-12 justify-center'>
        <div className='flex flex-col gap-2 place-items-center'>
          <img src={user.profilePhoto} className='w-[150px] h-[150px] rounded-full border-2 border-slate-500 shadow-lg' />
          <p className='text-2xl text-bold text-slate-200'>{user.username}</p>
          <p className='text-slate-200'>{user.bio}</p>
        </div>
      </div>
      <div className='flex flex-row gap-2 place-items-center'>
        <p className='pt-3'>Username:</p>
        <input className='bg-slate-200 text-black px-4 py-2 rounded-lg shadow md:min-w-[20rem]' type='text' value={usernameState} onChange={handleUsernameInput} placeholder={user.username} />
        <CheckIcon onClick={() => saveUsername()} className="h-8 w-8" />
      </div>
      <div className='flex flex-row grow gap-2 place-items-center'>
        <p className='pt-3'>Bio:</p>
        <textarea className='bg-slate-200 text-black px-4 py-2 rounded-lg shadow md:min-w-[24rem] min-h-[8rem] w-full' value={bioState} onChange={(e) => setBioState(e.target.value)} placeholder={user.bio} />
        <CheckIcon onClick={() => saveBio()} className="h-8 w-8" />
      </div>
      <div className='flex flex-row gap-2 place-items-center'>
        <p className='pt-4'>Photo:</p>
        <input type='file' className='block w-full px-2 py-4 text-gray-200 rounded' onChange={(e) => setSelectedFile(e.target.files[0])} />
        <CheckIcon className="h-8 w-8" onClick={() => uploadProfilePhoto()} />
      </div>
      {infoMessage &&
        <p className={(infoMessage.type === 'error') ? 'text-red-500' : 'text-green-600'}>{infoMessage.message}</p>
      }
    </div>
  </>)
}
