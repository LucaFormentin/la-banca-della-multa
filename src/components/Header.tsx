'use client'

import { useAuthCtx } from '@/app/context/auth-context'
import { signOut } from '@/lib/firebase/auth'
import { ROUTE } from '@/lib/routes'
import { useRouter } from 'next/navigation'
import { type MouseEvent } from 'react'

const Header = () => {
  const authenticatedUser = useAuthCtx()
  const router = useRouter()

  const handleSignOut = async (e: MouseEvent) => {
    e.preventDefault()

    signOut()
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        router.push(ROUTE)
      })
  }

  return (
    <header>
      <span>Current User: {authenticatedUser?.email}</span>
      <button
        className='rounded-full border border-solid border-white/[.145] p-4 px-8 text-center'
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </header>
  )
}

export default Header
