'use client'

import { useAuthCtx } from '@/app/context/auth-context'
import {
  provider,
  signInWithGoogle,
  signOut,
} from '@/lib/firebase/auth'
import { auth } from '@/lib/firebase/config'
import { GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { useRouter } from 'next/navigation'

const Header = () => {
  const authenticatedUser = useAuthCtx()
  console.log("🚀 ~ Header ~ authenticatedUser:", authenticatedUser)

  const router = useRouter()

  const handleSignInWithGoogle = async (e: any) => {
    e.preventDefault()

    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken
      const user = result.user
      console.log('User signed in with Google:', user)
    }).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.customData.email
      const credential = GoogleAuthProvider.credentialFromError(error)
      console.error('Error signing in with Google:', errorCode, errorMessage, email, credential)
    }).finally(() => {
      router.push('/hello-world')
    })
  }

  const handleSignOut = async (e: any) => {
    e.preventDefault()
    signOut()
    router.push('/')
  }

  return (
    <header>
      <button
        className='rounded-full border border-solid border-white/[.145] p-4 px-8 text-center'
        onClick={handleSignInWithGoogle}
      >
        Sign in
      </button>
      <button
        className='rounded-full border border-solid border-white/[.145] p-4 px-8 text-center'
        onClick={handleSignOut}
      >
        Sign Out
      </button>
      Current User: {authenticatedUser?.displayName}
    </header>
  )
}

export default Header
