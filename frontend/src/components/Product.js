import React, { useState } from 'react';

import app from '../firebase';
import { getFirestore, doc, query, collection, where, updateDoc, deleteDoc, getDocs } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { CheckIcon } from '@heroicons/react/outline';

export default function Product({ user, product }) {

  const db = getFirestore(app);
  const storage = getStorage(app);

  const canEditProduct = true;

  const [mode, setMode] = useState(false);
  const [titleEdit, setTitleEdit] = useState('');
  const [descriptionEdit, setDescriptionEdit] = useState('');
  const [priceEdit, setPriceEdit] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [infoMessage, setInfoMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  function saveTitle() {
    if (titleEdit === '') {
      setInfoMessage({
        type: 'error',
        message: 'Title must not be blank',
      });
      return clearInfoMessage();
    }
    updateDoc(doc(db, 'products', product.id), {
      title: titleEdit,
    })
      .then(() => {
        setInfoMessage({ type: 'success', message: 'Title saved.' })
        clearInfoMessage();
      })
      .catch(err => {
        setInfoMessage({ type: 'error', message: 'Error saving Title.' })
        clearInfoMessage();
      })
  }

  function clearInfoMessage() {
    setMode(false);
    setTimeout(() => {
      setInfoMessage('')
    }, 5000)
  }

  function saveDescription() {
    if (descriptionEdit === '') {
      setInfoMessage({
        type: 'error',
        message: 'Description must not be blank',
      });
      return clearInfoMessage();
    }
    updateDoc(doc(db, 'products', product.id), {
      description: descriptionEdit,
    })
      .then(() => {
        setInfoMessage({ type: 'success', message: 'Description saved.' })
        clearInfoMessage();
      })
      .catch(err => {
        setInfoMessage({ type: 'error', message: 'Error saving description.' })
        clearInfoMessage();
      })
  }

  function savePrice() {
    updateDoc(doc(db, 'products', product.id), {
      price: priceEdit,
    })
      .then(() => {
        setInfoMessage({ type: 'success', message: 'Price saved.' })
        clearInfoMessage();
      })
      .catch(err => {
        setInfoMessage({ type: 'error', message: 'Error saving price.' })
        clearInfoMessage();
      })
  }

  function saveQuantity() {
    updateDoc(doc(db, 'products', product.id), {
      quantity: quantity
    })
      .then(() => {
        setInfoMessage({ type: 'success', message: 'Stock quantity saved.' })
        clearInfoMessage();
      })
      .catch(err => {
        setInfoMessage({ type: 'error', message: 'Error saving stock quantity.' })
        clearInfoMessage();
      })
  }

  function uploadProductPhoto() {
    if (selectedFile === null) {
      setInfoMessage({ type: 'error', message: 'Please choose a file first.' });
      return clearInfoMessage();
    };
    const productPhotoRef = ref(storage, `product-photos/${product.id}/-${selectedFile.name}`)
    uploadBytes(productPhotoRef, selectedFile)
      .then((result) => {
        getDownloadURL(result.ref)
          .then((downloadURL) => {
            updateDoc(doc(db, 'products', product.uid), {
              photo: downloadURL
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

  function deleteProduct() {
    const productQuery = query(collection(db, 'products'), where('title', '==', product.title))
    getDocs(productQuery)
      .then((snapshot) => {
        snapshot.forEach(doc => {
          deleteDoc(doc.ref)
            .then(() => {
              setInfoMessage({ type: 'success', message: 'Product deleted!' });
              return clearInfoMessage()
            })
            .catch(error => {
              setInfoMessage({ type: 'error', message: error.message });
              return clearInfoMessage();
            })
        })
      })
  }

  return (
    <div>
      <div className='flex flex-row gap-4 py-6 px-8 justify-center'>
        <div className='flex flex-col gap-2 place-items-center'>
          <img src={product.photo} className='max-w-[300px] rounded-lg border-2 border-slate-500 shadow-lg mb-2' />
          {!mode && (<>
            <p className='text-2xl text-bold text-slate-200'>{product.title}</p>
            <p className='text-slate-200'>{product.description}</p>
            <p className='text-slate-200'>${product.price}</p>
            <p className='text-slate-200'>{product.quantity > 0 ? 'In stock now!' : 'Out of stock :('} </p>
            {canEditProduct &&
              <button onClick={() => setMode(!mode)} className='px-4 py-2 text-slate-400 hover:text-slate-200 border border-slate-400 hover:border-slate-200 hover:shadow rounded-full'>Edit</button>
            }
          </>)}
          {mode && (<>
            <div className='flex flex-row grow gap-4 place-items-center'>
              <p className='pt-3'>Title:</p>
              <input type='text' placeholder={product.title} className='text-black bg-slate-200 px-4 py-2 rounded-lg' value={titleEdit} onChange={(e) => setTitleEdit(e.target.value)} />
              <CheckIcon onClick={() => saveTitle()} className="h-8 w-8" />
            </div>
            <div className='flex flex-row grow gap-2 place-items-center'>
              <p className='pt-3'>Description:</p>
              <textarea placeholder={product.description} className='bg-slate-200 text-black px-4 py-2 rounded-lg shadow md:min-w-[24rem] min-h-[8rem] w-full' value={descriptionEdit} onChange={(e) => setDescriptionEdit(e.target.value)} />
              <CheckIcon onClick={() => saveDescription()} className="h-8 w-8" />
            </div>
            <div className='flex flex-row grow gap-2 place-items-center'>
              <p className='pt-3'>Price:</p>
              <input type='number' value={priceEdit} onChange={(e) => setPriceEdit(e.target.value)} className='bg-slate-200 px-4 py-2 text-slate-700 rounded-lg' />
              <CheckIcon onClick={() => savePrice()} className="h-8 w-8" />
            </div>
            <div className='flex flex-row grow gap-2 place-items-center'>
              <p className='pt-3'>Stock:</p>
              <input type='number' value={quantity} onChange={(e) => setQuantity(e.target.value)} className='bg-slate-200 px-4 py-2 text-slate-700 rounded-lg' />
              <CheckIcon onClick={() => saveQuantity()} className="h-8 w-8" />
            </div>
            <div className='flex flex-row gap-2 place-items-center'>
              <p className='pt-4'>Photo:</p>
              <input type='file' className='block w-full px-2 py-4 text-gray-200 rounded' onChange={(e) => setSelectedFile(e.target.files[0])} />
              <CheckIcon className="h-8 w-8" onClick={() => uploadProductPhoto()} />
            </div>
            <div className='flex flex-row gap-4 place-items-center'>
              <button onClick={() => deleteProduct()} className='px-4 py-2 text-red-400 hover:text-red-600 border border-red-400 hover:border-red-600 hover:shadow rounded-full'>Delete Product</button>
              <button onClick={() => setMode(!mode)} className='px-4 py-2 text-slate-400 hover:text-slate-200 border border-slate-400 hover:border-slate-200 hover:shadow rounded-full'>Done</button>
            </div>
          </>)}
          {infoMessage &&
            <p className={(infoMessage.type === 'error') ? 'text-red-500' : 'text-green-600'}>{infoMessage.message}</p>
          }
        </div>
      </div>
    </div>
  );
}
