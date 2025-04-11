'use client'

import { cn } from '@/lib/utils/helpers'
import classes from './styles.module.css'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import Image from 'next/image'
import { useAuthCtx } from '@/app/context/auth-context'
import { type TeamT } from '@/lib/classes/Teams'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

type Props = {
  teamData: TeamT
}

const ITEMS = [
  {
    label: 'Vedi Multe',
    href: '/fines',
    color: 'bg-green-600',
    icon: 'fine',
    requireAdminRole: false,
  },
  {
    label: 'Controlla Cassa',
    href: '/cash',
    color: 'bg-emerald-600',
    icon: 'cash',
    requireAdminRole: false,
  },
  {
    label: 'Gestisci Squadra',
    href: '/manage-team',
    color: 'bg-amber-600',
    icon: 'team',
    requireAdminRole: true,
  },
  {
    label: 'Gestisci Multe',
    href: '/manage-fines',
    color: 'bg-orange-600',
    icon: 'fine_manager',
    requireAdminRole: true,
  },
]

const MenuItems = ({ teamData }: Props) => {
  const authenticatedUser = useAuthCtx()
  const router = useRouter()
  const pathname = usePathname()
  const [userRole, setUserRole] = useState<'ADMIN' | 'GUEST' | null>(null)
  const [items, setItems] = useState(ITEMS)

  useEffect(() => {
    // set user role based on authenticated user
    teamData.members.find((member) => {
      if (member.uid === authenticatedUser?.uid) {
        setUserRole(member.role)
      }
    })
  }, [])

  useEffect(() => {
    if (!userRole) return

    // filter items based on user role
    // if user is admin, show all items, otherwise filter out admin items
    userRole === 'ADMIN'
      ? setItems(ITEMS)
      : setItems(ITEMS.filter((item) => !item.requireAdminRole))
  }, [userRole])

  return (
    <>
      <p>Ruolo utente: {userRole}</p>
      <ul className={classes.menu__items__wrapper}>
        {items.map((item, index) => (
          <li
            key={index}
            className={classes.menu__item}
            onClick={() => router.push(`${pathname}/${item.href}`)}
          >
            <div className={cn(classes.item__id, item.color)} />
            <Image
              src={`/assets/${item.icon}.png`}
              alt='team logo'
              width={64}
              height={64}
            />
            <p>{item.label}</p>
            <button className={classes.select__menu__item__btn}>
              <ChevronRightRoundedIcon fontSize='large' />
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default MenuItems
