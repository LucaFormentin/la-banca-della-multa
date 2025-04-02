import { auth } from './config'
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
} from 'firebase/auth'

export function onAuthStateChanged(callbackFn: any) {
  return _onAuthStateChanged(auth, callbackFn)
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()

  try {
    await signInWithPopup(auth, provider)

    // create new user in database if not exists
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message

    throw new Error(
      `Error signing in with Google: ${errorCode} - ${errorMessage}`
    )
  }
}

export async function signOut() {
  try {
    return auth.signOut()
  } catch (error) {
    throw new Error(`Error signing out with Google: ${error}`)
  }
}
