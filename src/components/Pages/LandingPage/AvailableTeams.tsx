import { type TeamT } from '@/lib/classes/Teams'
import classes from './styles.module.css'
import Image from 'next/image'
import { Chip } from '@mui/material'
import { useAuthCtx } from '@/app/context/auth-context'
import { api } from '@/lib/utils/api-client'
import { type AuthenticatedUserT } from '@/lib/classes/Users'
import { type EmailBodyT } from '@/components/Templates/ReactEmailTemplate'

type Props = {
  teams: TeamT[]
}

/**
 *
 * @param param0 teams data filtered to show only the teams that the user can subscribe to
 * @returns
 */
const AvailableTeams = ({ teams }: Props) => {
  const authenticatedUser = useAuthCtx()

  const joinTeam = async (tData: TeamT) => {
    const { id, name, members } = tData

    const admin = members.find((m) => m.role === 'ADMIN')

    if (!admin) {
      console.error('No admin found for this team')
      return
    }

    api
      .get<{ data: AuthenticatedUserT }>(`/users/${admin.uid}`)
      .then((res) => {
        const { email: adminAddress, displayName: adminName } = res.data

        const emailBodyData: EmailBodyT = {
          teamId: id,
          teamName: name,
          adminAddress,
          adminName,
          applicantEmail: authenticatedUser?.email || null,
        }

        api.post('/email/send', emailBodyData)
      })
      .catch((err) => {
        console.error('Error:', err)
      })
  }

  return (
    <div>
      <p>Available teams:</p>
      <ul className={classes.card__list}>
        {teams.map((t) => (
          <li className={classes.team__card} key={t.id}>
            <div
              className={classes.team__id}
              style={{ backgroundColor: t.color }}
            />
            <Image
              className={classes.team__logo}
              src={t.logo || '/assets/generic_team_logo.png'}
              alt='team logo'
              width={64}
              height={64}
            />
            <div className={classes.team__info}>
              <p>{t.name}</p>
              <p>{t.location}</p>
            </div>
            <button
              className={classes.join__btn}
              onClick={joinTeam.bind(this, t)}
            >
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
