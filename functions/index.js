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
    username: ''
  })
  .catch(error => {
    console.error(error)
  })
  return
})


