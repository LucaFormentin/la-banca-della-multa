'use client'

import { useAuthCtx } from '@/app/context/auth-context'
import { signInWithGoogle } from '@/lib/firebase/auth'
import { LANDING_PAGE } from '@/lib/routes'
import { useRouter } from 'next/navigation'
import { useEffect, type MouseEvent } from 'react'
import GoogleBtn from './GoogleBtn'

const AuthController = () => {
  const authenticatedUser = useAuthCtx()
  const router = useRouter()

  useEffect(() => {
    // Check if the user is already authenticated
    // If so, redirect to the landing page
    if (authenticatedUser) {
      router.push(LANDING_PAGE)
    }
  }, [])

  const handleSignInWithGoogle = async (e: MouseEvent) => {
    e.preventDefault()

    signInWithGoogle()
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        router.push(LANDING_PAGE)
      })
  }

  return (
    <div>
      <GoogleBtn onClick={handleSignInWithGoogle} />
    </div>
  )
}

export default AuthController
