'use client'

import { useAuthCtx } from '@/app/context/auth-context'
import { signInWithGoogle } from '@/lib/firebase/auth'
import { LANDING_PAGE } from '@/lib/routes'
import { useRouter } from 'next/navigation'
import { useEffect, type MouseEvent } from 'react'
import GoogleBtn from './GoogleBtn'
import SignInPasswordForm from './SignInPasswordForm'
import { type UserCredential } from 'firebase/auth'

const AuthController = () => {
  const authenticatedUser = useAuthCtx()
  const router = useRouter()

  useEffect(() => {
    // Check if the user is already authenticated
    // If so, redirect to the landing page
    if (authenticatedUser) {
      router.push(`/${authenticatedUser.uid}/${LANDING_PAGE}`)
    }
  }, [])

  const handleSignInWithGoogle = async (e: MouseEvent) => {
    e.preventDefault()

    signInWithGoogle()
      .then(({ user }: UserCredential) => {
        const { uid } = user
        router.push(`/${uid}/${LANDING_PAGE}`)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className='flex flex-col gap-4 justify-center items-center'>
      <GoogleBtn onClick={handleSignInWithGoogle} />
      <SignInPasswordForm />
    </div>
  )
}

export default AuthController
