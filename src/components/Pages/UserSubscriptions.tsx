import { type UserTeamDataT } from '@/lib/classes/Users'
import classes from './pages.module.css'
import Image from 'next/image'
import { Chip } from '@mui/material'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'

type Props = {
  userTeams: UserTeamDataT[]
}

const UserSubscriptions = ({ userTeams }: Props) => {
  return (
    <div>
      <p>User subscriptions:</p>
      <ul className={classes.card__list}>
        {userTeams.length === 0 && <p>No subscriptions yet.</p>}
        {userTeams.length > 0 &&
          userTeams.map((item) => (
            <li className={classes.team__card} key={item.teamData.id}>
              <Image
                src={item.teamData.logo || '/assets/generic_team_logo.png'}
                alt='team logo'
                width={64}
                height={64}
              />
              <div className={classes.team__info}>
                <p>{item.teamData.name}</p>
                <p>{item.teamData.location}</p>
              </div>
              <Chip
                label={item.role}
                color={item.role === 'ADMIN' ? 'success' : 'warning'}
                size='small'
                sx={{
                  fontSize: '0.7rem',
                }}
              />
              <button className={classes.enter__btn}>
                <ChevronRightRoundedIcon fontSize='large' />
              </button>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default UserSubscriptions
