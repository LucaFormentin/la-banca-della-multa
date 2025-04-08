'use client'

import { type AuthenticatedUserT } from '@/lib/classes/Users'
import { onAuthStateChanged } from '@/lib/firebase/auth'
import { type User } from 'firebase/auth'
import { useState, useEffect } from 'react'

/**
 *
 * @param props - initialUser: The user object returned from Firebase authentication. This is used to set the initial state of the user.
 * @returns
 * - user: The authenticated user object. It contains all data retrieved from Firebase.
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
      if (!u) {
        setUser(null)
      } else {
        setUser({
          uid: u.uid,
          email: u.email,
          displayName: u.displayName,
          photoURL: u.photoURL,
        })
      }

      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { user, isLoading }
}

export default useUserSession
