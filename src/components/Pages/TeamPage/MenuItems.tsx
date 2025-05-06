'use client'

import { cn } from '@/lib/utils/helpers'
import classes from './styles.module.css'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import Image from 'next/image'
import { useAuthCtx } from '@/app/context/auth-context'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTeamCtx } from '@/app/context/team-context'
import Link from 'next/link'

export const ITEMS = [
  {
    title: 'Registro Multe',
    subtitle: 'Controlla o assegna multe ai giocatori',
    href: '/fines',
    color: 'bg-green-600',
    icon: 'fine',
    requireAdminRole: false,
  },
  {
    title: 'Controlla Cassa',
    subtitle: 'Controlla gli incassi accumulati',
    href: '/cash',
    color: 'bg-emerald-600',
    icon: 'cash',
    requireAdminRole: false,
  },
  {
    title: 'Gestisci Squadra',
    subtitle: 'Modifica i membri e i dati della squadra',
    href: '/manage-team',
    color: 'bg-amber-600',
    icon: 'team',
    requireAdminRole: true,
  },
  {
    title: 'Gestisci Multe',
    subtitle: 'Modifica i dati delle multe',
    href: '/manage-fines',
    color: 'bg-orange-600',
    icon: 'fine_manager',
    requireAdminRole: true,
  },
  {
    title: 'Gestisci Accessi',
    subtitle: 'Controlla gli accessi alla squadra',
    href: '/manage-access',
    color: 'bg-red-600',
    icon: 'access_manager',
    requireAdminRole: true,
  },
]

const MenuItems = () => {
  const { teamData } = useTeamCtx()
  const authenticatedUser = useAuthCtx()
  const pathname = usePathname()
  const [userRole, setUserRole] = useState<'SUPER' | 'ADMIN' | 'GUEST' | null>(null)
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
    // if user is super or admin, show all items, otherwise filter out admin items
    (userRole === 'SUPER' || userRole === 'ADMIN')
      ? setItems(ITEMS)
      : setItems(ITEMS.filter((item) => !item.requireAdminRole))
  }, [userRole])

  return (
    <>
      <p>Ruolo utente: {userRole}</p>
      <ul className={classes.menu__items__wrapper}>
        {items.map((item, index) => (
          <Link href={`${pathname}/${item.href}`} key={index}>
            <li className={classes.menu__item}>
              <div className={cn(classes.item__id, item.color)} />
              <Image
                src={`/assets/${item.icon}.png`}
                alt='team logo'
                width={64}
                height={64}
              />
              <div className={classes.menu__item__info}>
                <p>{item.title}</p>
                <p>{item.subtitle}</p>
              </div>
              <button className={classes.select__menu__item__btn}>
                <ChevronRightRoundedIcon fontSize='large' />
              </button>
            </li>
          </Link>
        ))}
      </ul>
    </>
  )
}

export default MenuItems
