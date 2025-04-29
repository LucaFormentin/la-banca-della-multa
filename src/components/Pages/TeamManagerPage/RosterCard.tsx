import { RosterMember } from '@/lib/classes/Teams'
import classes from './styles.module.css'
import { capitalizeFirstLetter } from '@/lib/utils/helpers'
import Image from 'next/image'

type Props = {
  data: RosterMember<'PLAYER'> | RosterMember<'STAFF'>
}

const RosterCard = ({ data }: Props) => {
  const isPlayer = 'number' in data

  return (
    <li className={classes.roster__card}>
      <div id='logo' className={classes.roster__card__image}>
        {isPlayer ? (
          <p>{data.number}</p>
        ) : (
          <Image src='/assets/user.png' alt='coach' width={64} height={64} />
        )}
      </div>
      <div id='info' className={classes.roster__card__info}>
        <p>
          {data.lastName} {data.firstName}
        </p>
        <p>{capitalizeFirstLetter(data.role)}</p>
      </div>
    </li>
  )
}

export default RosterCard
