'use client'

import { signOut } from '@/lib/firebase/auth'
import { ROUTE } from '@/lib/routes'
import { useRouter } from 'next/navigation'
import AccountMenu, { type MenuItemT } from './AccountMenu'

const Header = () => {
  const router = useRouter()

  const handleSignOut = async () => {
    signOut()
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        router.push(ROUTE)
      })
  }

  const handleMenuItemClick = (item: MenuItemT) => {
    switch (item) {
      case 'SIGN_OUT':
        handleSignOut()
        break
      default:
        console.error('Unknown menu item clicked:', item)
    }
  }

  return (
    <header className='w-full flex justify-end border-b-2 border-red-500'>
      <AccountMenu onItemClick={handleMenuItemClick} />
    </header>
  )
}

export default Header
