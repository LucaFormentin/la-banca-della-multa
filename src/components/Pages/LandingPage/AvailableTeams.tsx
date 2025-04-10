import { type TeamT } from '@/lib/classes/Teams'
import classes from './styles.module.css'
import Image from 'next/image'
import { Chip } from '@mui/material'

type Props = {
  teams: TeamT[]
}

const AvailableTeams = ({ teams }: Props) => {
  return (
    <div>
      <p>Available teams:</p>
      <ul className={classes.card__list}>
        {teams.map((t) => (
          <li className={classes.team__card} key={t.id}>
            <Image
              src={t.logo || '/assets/generic_team_logo.png'}
              alt='team logo'
              width={64}
              height={64}
            />
            <div className={classes.team__info}>
              <p>{t.name}</p>
              <p>{t.location}</p>
            </div>
            <button className={classes.join__btn}>
              <Chip
                label='JOIN'
                color='primary'
                size='small'
                sx={{
                  fontSize: '0.7rem',
                }}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AvailableTeams
