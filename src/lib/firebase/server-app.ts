import { initializeServerApp } from 'firebase/app'
import { headers } from 'next/headers'
import { firebaseConfig } from './config'
import { getAuth } from 'firebase/auth'

export async function getAuthenticatedAppForUser() {
  const idToken = (await headers()).get('Authorization')?.split('Bearer ')[1]
  const authIdToken = idToken ? { authIdToken: idToken } : {}

  const firebaseServerApp = initializeServerApp(firebaseConfig, authIdToken)

  const auth = getAuth(firebaseServerApp)
  await auth.authStateReady()

  return { firebaseServerApp, currentUser: auth.currentUser }
}
