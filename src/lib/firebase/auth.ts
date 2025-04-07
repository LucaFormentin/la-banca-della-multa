import { auth } from './config'
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword as _createUserWithEmailAndPassword,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  onAuthStateChanged as _onAuthStateChanged,
} from 'firebase/auth'

export function onAuthStateChanged(callbackFn: any) {
  return _onAuthStateChanged(auth, callbackFn)
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()

  try {
    const res = await signInWithPopup(auth, provider)

    // create new user in database if not exists

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
