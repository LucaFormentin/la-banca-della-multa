'use client'

import { User } from 'firebase/auth'
import { createContext, type PropsWithChildren, useContext } from 'react'
import useUserSession, { type AuthenticatedUserT } from '../hooks/useUserSession'

type AuthContextProviderProps = PropsWithChildren<{
  initialUser: User | null
}>

const AuthContext = createContext<AuthenticatedUserT | null>(null)

const useAuthCtx = () => {
  return useContext(AuthContext)
}

/**
 * 
 * @param param0 - initialUser: The user object returned from Firebase authentication. This is used to set the initial state of the user.
 * @returns - AuthContextProvider: Provides the authenticated user object.
 */
const AuthContextProvider = ({
  initialUser,
  children,
}: AuthContextProviderProps) => {
  const { user: authenticatedUser, isLoading } = useUserSession({ initialUser })

  // This is the value that will be passed to the context
  const authCtxValue: AuthenticatedUserT | null = authenticatedUser

  return (
    <AuthContext.Provider value={authCtxValue}>
      {isLoading ? <p>Loading session...</p> : children}
    </AuthContext.Provider>
  )
}

export { useAuthCtx, AuthContextProvider }
