import { auth } from './config'
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
} from 'firebase/auth'

export const provider = new GoogleAuthProvider()

export function onAuthStateChanged(callbackFn: any) {
  return _onAuthStateChanged(auth, callbackFn)
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()

  try {
    await signInWithPopup(auth, provider)
    
    // create new user in database if not exists
    // redirect to landing page

  } catch (error:any) {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.error('Error signing in with Google:', errorCode, errorMessage)
  }
}

export async function signOut() {
  try {
    // redirect to homepage

    return auth.signOut()
  } catch (error) {
    console.error('Error signing out with Google', error)
  }
}
