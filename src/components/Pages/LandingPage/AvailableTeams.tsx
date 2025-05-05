import { type TeamT } from '@/lib/classes/Teams'
import classes from './styles.module.css'
import AvailableTeamCard from './AvailableTeamCard'
import { useEffect, useState } from 'react'
import { api } from '@/lib/utils/api-client'
import { type PendingSubscriptionT } from '@/lib/classes/Users'
import { useAuthCtx } from '@/app/context/auth-context'

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
  const [pendingSubscriptions, setPendingSubscriptions] = useState<
    PendingSubscriptionT[]
  >([])

  useEffect(() => {
    api
      .get<{ data: PendingSubscriptionT[] }>(
        `/users/${authenticatedUser!.uid}/get-pending-subscriptions`
      )
      .then((res) => {
        const pendingSubs = res.data

        if (pendingSubs.length === 0) return

        setPendingSubscriptions(pendingSubs)
      })
      .catch((err) => {
        console.error('Error:', err)
      })
  }, [])

  return (
    <div>
      <p>Available teams:</p>
      <ul className={classes.card__list}>
        {teams.length === 0 && <p>No teams available.</p>}
        {teams.length > 0 &&
          teams.map((t) => {
            let isPending = pendingSubscriptions.some((p) => p.teamId === t.id)

            return (
              <AvailableTeamCard
                key={t.id}
                teamData={t}
                requestStatus={isPending ? 'PENDING' : 'JOIN'}
              />
            )
          })}
      </ul>
    </div>
  )
}

export default AvailableTeams
