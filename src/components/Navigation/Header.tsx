'use client'

import { signOut } from '@/lib/firebase/auth'
import { LANDING_PAGE, ROUTE } from '@/lib/routes'
import { useRouter } from 'next/navigation'
import AccountMenu, { type MenuItemT } from './AccountMenu'
import toast from 'react-hot-toast'
import classes from './styles.module.css'
import { useAuthCtx } from '@/app/context/auth-context'
import Image from 'next/image'
import Link from 'next/link'

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

  return (
    <header className={classes.header__wrapper}>
      <Link
        href={`/${authenticatedUser?.uid}/${LANDING_PAGE}`}
        className='flex'
      >
        <div className={classes.header__logo__wrapper}>
          <Image
            src={'/assets/android-chrome-512x512.png'}
            alt='app-logo'
            fill
            className='object-cover'
          />
        </div>
        <h1 className={classes.header__title}>
          La Banca della Multa
        </h1>
      </Link>
      <AccountMenu onItemClick={handleMenuItemClick} />
    </header>
  )
}

export default Header
