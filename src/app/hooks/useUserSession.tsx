'use client'

import { onAuthStateChanged } from '@/lib/firebase/auth'
import { type User } from 'firebase/auth'
import { useState, useEffect } from 'react'

export type AuthenticatedUserT = {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

/**
 *
 * @param props - initialUser: The user object returned from Firebase authentication. This is used to set the initial state of the user.
 * @returns
 * - user: The authenticated user object. It contains the uid, email, and displayName of the user.
 * - isLoading: A boolean indicating whether the authentication state is still being loaded.
 */
const useUserSession = (props: { initialUser: User | null }) => {
  const initialUser = props.initialUser
    ? {
        uid: props.initialUser.uid,
        email: props.initialUser.email,
        displayName: props.initialUser.displayName,
        photoURL: props.initialUser.photoURL,
      }
    : null
  const [user, setUser] = useState<AuthenticatedUserT | null>(initialUser)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((u: User) => {
      u
        ? setUser({
            uid: u.uid,
            email: u.email,
            displayName: u.displayName,
            photoURL: u.photoURL,
          })
        : setUser(null)

      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { user, isLoading }
}

export default useUserSession
