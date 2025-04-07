'use client'

import { signOut } from '@/lib/firebase/auth'
import { ROUTE } from '@/lib/routes'
import { useRouter } from 'next/navigation'
import AccountMenu, { type MenuItemT } from './AccountMenu'
import toast from 'react-hot-toast'
import classes from './nav.module.css'

const Header = () => {
  const router = useRouter()

  const handleSignOut = async () => {
    signOut()
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        router.push(ROUTE)
        toast.success('Signed out successfully!')
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
    <header className={classes.header__wrapper}>
      <AccountMenu onItemClick={handleMenuItemClick} />
    </header>
  )
}

export default Header
