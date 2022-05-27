import React, { useState } from 'react';

import app from '../firebase';
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function AddProduct({ user }) {

  const db = getFirestore(app);
  const storage = getStorage(app);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [infoMessage, setInfoMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  function clearState() {
    setTitle('');
    setDescription('');
    setPrice(0);
    setQuantity(0);
    setSelectedFile(null);
  }

  function saveNewProduct() {
    if (selectedFile === null ||
      title === null ||
      description === null ||
      price === null ||
      quantity === null) {
      setInfoMessage({ type: 'error', message: 'Please choose a file first.' });
      return clearInfoMessage();
    };

    const productPhotoRef = ref(storage, `product-photos/${user.uid}/-${selectedFile.name}`)
    uploadBytes(productPhotoRef, selectedFile)
      .then((result) => {
        getDownloadURL(result.ref)
          .then((downloadURL) => {
            setDoc(doc(db, 'products', `${title}-${user.uid}`), {
              title,
              description,
              price,
              quantity,
              photo: downloadURL,
              owner: user.uid,
              id: `${title}-${user.uid}`
            })
              .then(() => {
                setInfoMessage({ type: 'success', message: 'Successfully saved new product' });
                clearState()
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
  }

  function clearInfoMessage() {
    setTimeout(() => {
      setInfoMessage('')
    }, 5000)
  }

  return (
    <div>
      <div className='flex flex-row gap-4 py-6 px-8 justify-center'>
        <div className='flex flex-col gap-4 place-items-center'>
          <p className='text-2xl pb-2'>Add New Product:</p>
          <div className='flex flex-row grow gap-4 place-items-center'>
            <p className='pt-3'>Title:</p>
            <input type='text' placeholder='title' className='bg-slate-200 text-black px-4 py-2 rounded-lg' value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className='flex flex-row grow gap-2 place-items-center'>
            <p className='pt-3'>Description:</p>
            <textarea placeholder='description' className='bg-slate-200 text-black px-4 py-2 rounded-lg shadow md:min-w-[24rem] min-h-[8rem] w-full' value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className='flex flex-row grow gap-2 place-items-center'>
            <p className='pt-3'>Price:</p>
            <input type='number' value={price} onChange={(e) => setPrice(e.target.value)} className='bg-slate-200 px-4 py-2 text-slate-700 rounded-lg' />
          </div>
          <div className='flex flex-row grow gap-2 place-items-center'>
            <p className='pt-3'>Stock:</p>
            <input type='number' value={quantity} onChange={(e) => setQuantity(e.target.value)} className='bg-slate-200 px-4 py-2 text-slate-700 rounded-lg' />
          </div>
          <div className='flex flex-row gap-2 place-items-center'>
            <p className='pt-4'>Photo:</p>
            <input type='file' className='block w-full px-2 py-4 text-gray-200 rounded' onChange={(e) => setSelectedFile(e.target.files[0])} />
          </div>
          {infoMessage &&
            <p className={(infoMessage.type === 'error') ? 'text-red-500' : 'text-green-600'}>{infoMessage.message}</p>
          }
          <button onClick={() => saveNewProduct()} className='px-4 py-2 text-slate-400 hover:text-slate-200 border border-slate-400 hover:border-slate-200 hover:shadow rounded-full'>Save</button>
        </div>
      </div>
    </div>
  );
}
