import app from '../firebase.js';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const db = getFirestore(app);

export default async function getUidFromUsername(username) {

  const profileCollection = collection(db, 'users');

  const profileQuery = query(profileCollection, where('username', '==', username))

  const profile = await getDocs(profileQuery);

  if (!profile.docs.length === 0) {
    return 'Document not found in users collection!'
  }

  return profile.docs[0].data().uid;
};
