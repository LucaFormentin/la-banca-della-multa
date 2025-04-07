'use client'

import { useAuthCtx } from '@/app/context/auth-context'
import { LANDING_PAGE } from '@/lib/routes'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import SignInController from './SignInController'
import SignUpController from './SignUpController'
import classes from './auth.module.css'

const AuthController = () => {
  const authenticatedUser = useAuthCtx()
  const router = useRouter()
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')

  useEffect(() => {
    // Check if the user is already authenticated
    // If so, redirect to the landing page
    if (authenticatedUser) {
      router.push(`/${authenticatedUser.uid}/${LANDING_PAGE}`)
    }
  }, [])

  return (
    <div className={classes.controller__wrapper}>
      {authMode === 'signin' ? (
        <SignInController onChangeAuthMode={() => setAuthMode('signup')} />
      ) : (
        <SignUpController onChangeAuthMode={() => setAuthMode('signin')} />
      )}
    </div>
  )
}

export default AuthController
