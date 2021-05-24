const firebase = require('firebase/app')
require('firebase/firestore')
require('firebase/auth')
// require('firebase/analytics')

// const isClientSide = require('../isClientSide')

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "releasenotes-7b564.firebaseapp.com",
  projectId: "releasenotes-7b564",
  storageBucket: "releasenotes-7b564.appspot.com",
  messagingSenderId: "338484111310",
  appId: "1:338484111310:web:8269015aacf8df15376d9f",
  measurementId: "G-WEG4033386"
}

// Initialize Firebase
const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
const firebaseDB = firebaseApp.firestore()
// if (isClientSide()) firebase.analytics()

// Helpers
const docWithId = (doc) => ({ id: doc.id, ...doc.data() })

const getDocumentItem = async (docRef) => docWithId(await docRef.get())

const getCollectionItems = async (collectionRef) => {
  const collectionSnapshots = await collectionRef.get()
  const snapshots = []
  collectionSnapshots.forEach((snapshot) => {
    snapshots.push(docWithId(snapshot))
  })
  return snapshots
}

module.exports = {
  firebase,
  firebaseApp,
  firebaseDB,

  docWithId,
  getDocumentItem,
  getCollectionItems
}
