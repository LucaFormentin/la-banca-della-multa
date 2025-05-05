import { type UserTeamDataT } from '@/lib/classes/Users'
import classes from './styles.module.css'
import Image from 'next/image'
import { Chip } from '@mui/material'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import { useAuthCtx } from '@/app/context/auth-context'
import Link from 'next/link'

type Props = {
  userTeams: UserTeamDataT[]
}

const UserSubscriptions = ({ userTeams }: Props) => {
  const authenticatedUser = useAuthCtx()

  return (
    <div>
      <p>User subscriptions:</p>
      <ul className={classes.card__list}>
        {userTeams.length === 0 && <p>No subscriptions yet.</p>}
        {userTeams.length > 0 &&
          userTeams.map((item) => (
            <Link
              href={`/${authenticatedUser?.uid}/teams/${item.teamId}`}
              key={item.teamData.id}
            >
              <li className={classes.team__card}>
                <div
                  className={classes.team__id}
                  style={{ backgroundColor: item.teamData.color }}
                />
                <Image
                  className={classes.team__logo}
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
                  color={
                    item.role === 'SUPER'
                      ? 'success'
                      : item.role === 'ADMIN'
                        ? 'info'
                        : 'warning'
                  }
                  size='small'
                  sx={{
                    fontSize: '0.7rem',
                  }}
                />
                <button className={classes.enter__btn}>
                  <ChevronRightRoundedIcon fontSize='large' />
                </button>
              </li>
            </Link>
          ))}
      </ul>
    </div>
  )
}

export default UserSubscriptions
