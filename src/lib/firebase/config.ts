import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBLwdDDbIkNUN5VE3u1R-dR9vMl-5FzTQ4',
  authDomain: 'la-banca-della-multa.firebaseapp.com',
  databaseURL: 'https://la-banca-della-multa-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'la-banca-della-multa',
  storageBucket: 'la-banca-della-multa.firebasestorage.app',
  messagingSenderId: '581107301420',
  appId: '1:581107301420:web:5d9138eb4ce806a972e589',
  measurementId: 'G-GF7VRDGCPP',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const database = getDatabase(app)

export { firebaseConfig, app, auth, database }
