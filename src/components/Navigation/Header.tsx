'use client'

import { signOut } from '@/lib/firebase/auth'
import { LANDING_PAGE, ROUTE } from '@/lib/routes'
import { usePathname, useRouter } from 'next/navigation'
import AccountMenu, { type MenuItemT } from './AccountMenu'
import toast from 'react-hot-toast'
import classes from './nav.module.css'
import { Avatar } from '@mui/material'
import { useAuthCtx } from '@/app/context/auth-context'

const Header = () => {
  const router = useRouter()
  const authenticatedUser = useAuthCtx()

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

  const redirectToLandingPage = () => {
    router.push(`/${authenticatedUser?.uid}/${LANDING_PAGE}`)
  }

  return (
    <header className={classes.header__wrapper}>
      <h1 className={classes.header__title} onClick={redirectToLandingPage}>
        La Banca della Multa
      </h1>
      <AccountMenu onItemClick={handleMenuItemClick} />
    </header>
  )
}

export default Header
