import { type TeamT } from '@/lib/classes/Teams'
import classes from './styles.module.css'
import Image from 'next/image'
import { Chip } from '@mui/material'
import { api } from '@/lib/utils/api-client'
import { type AuthenticatedUserT } from '@/lib/classes/Users'
import { type EmailBodyT } from '@/components/Templates/ReactEmailTemplate'
import toast from 'react-hot-toast'
import { useAuthCtx } from '@/app/context/auth-context'
import { useEffect, useState } from 'react'

type Props = {
  teamData: TeamT
  requestStatus: 'PENDING' | 'JOIN'
}

const AvailableTeamCard = ({ teamData: t, requestStatus }: Props) => {
  const authenticatedUser = useAuthCtx()
  const [status, setStatus] = useState(requestStatus)

  useEffect(() => {
    setStatus(requestStatus)
  }, [requestStatus])

  const joinTeam = () => {
    const { id, name, members } = t

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
          applicantEmail: authenticatedUser!.email || null,
        }

        // api.post('/email/send', emailBodyData)
      })
      .catch((err) => {
        console.error('Error:', err)
      })
      .finally(() => {
        toast.success('Richiesta inviata!')

        api.get(
          `/users/${authenticatedUser!.uid}/set-request-status?teamId=${id}`
        )
      })
  }

  return (
    <li className={classes.team__card}>
      <div className={classes.team__id} style={{ backgroundColor: t.color }} />
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
        onClick={joinTeam}
        disabled={status === 'PENDING'}
      >
        <Chip
          label={status}
          color={status === 'JOIN' ? 'info' : 'warning'}
          size='small'
          sx={{
            fontSize: '0.7rem',
          }}
        />
      </button>
    </li>
  )
}

export default AvailableTeamCard
