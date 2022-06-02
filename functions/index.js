const functions = require("firebase-functions");
const admin = require('firebase-admin');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

admin.initializeApp();
const db = admin.firestore();

exports.onUserCreate = functions.auth.user().onCreate((user) => {
  db.collection('users').doc(user.uid).set({
    email: user.email,
    uid: user.uid,
    username: 'Username',
    bio: '',
    stats: {
      totalSales: 0,
      monthToDate: 0,
      lastSale: '',
      topSeller: '',
    },
    profilePhoto: 'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg',
  })
  .catch(error => {
    console.error(error)
  })
  return
})


