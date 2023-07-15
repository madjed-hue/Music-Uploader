import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDYmR_vG1mQ9gj_1pvfqtq4JL2XbBFH8m4',
  authDomain: 'music-674f5.firebaseapp.com',
  projectId: 'music-674f5',
  storageBucket: 'music-674f5.appspot.com',
  appId: '1:477743419510:web:f413e5e044e840d6e80f57'
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

db.enablePersistence().catch((error) => {
  console.log(`firebase persistence error: ${error.code}`)
})

const usersCollection = db.collection('users')
const songsCollection = db.collection('songs')
const commentsCollection = db.collection('comments')

export { auth, db, usersCollection, storage, songsCollection, commentsCollection }
