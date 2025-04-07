import { Users } from '../classes/Users'
import { auth } from './config'
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword as _createUserWithEmailAndPassword,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  onAuthStateChanged as _onAuthStateChanged,
  UserCredential,
} from 'firebase/auth'

/**
 * Adds a user to the database after creating an account.
 * @param param0 - The user credential object returned from Firebase.
 */
const addUserToDatabase = async ({ user }: UserCredential) => {
  const userData = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  }

  const users = new Users()
  await users.create(userData)
}

export function onAuthStateChanged(callbackFn: any) {
  return _onAuthStateChanged(auth, callbackFn)
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()

  try {
    const res = await signInWithPopup(auth, provider)

    addUserToDatabase(res)

    return res
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message

    throw new Error(
      `Error signing in with Google: ${errorCode} - ${errorMessage}`
    )
  }
}

export async function createUserWithEmailAndPassword(
  email: string,
  password: string
) {
  try {
    const res = await _createUserWithEmailAndPassword(auth, email, password)

    addUserToDatabase(res)

    return res
  } catch (error) {
    throw new Error(`Error creating user with email and password: ${error}`)
  }
}

export async function signInWithEmailAndPassword(
  email: string,
  password: string
) {
  try {
    const res = await _signInWithEmailAndPassword(auth, email, password)
    return res
  } catch (error) {
    throw new Error(`Error signing in with email and password: ${error}`)
  }
}

export async function signOut() {
  try {
    return auth.signOut()
  } catch (error) {
    throw new Error(`Error signing out with Google: ${error}`)
  }
}
