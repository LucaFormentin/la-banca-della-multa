'use client'

import { useAuthCtx } from '@/app/context/auth-context'
import {
  type UserTeamDataT,
  type AuthenticatedUserT,
} from '@/lib/classes/Users'
import NewTeamForm from './NewTeamForm'
import { useState } from 'react'
import UserSubscriptions from './UserSubscriptions'
import AvailableTeams from './AvailableTeams'
import { type TeamT } from '@/lib/classes/Teams'

type Props = {
  userData: AuthenticatedUserT
  userTeams: UserTeamDataT[]
  teams: TeamT[]
}

/**
 *
 * @param userData user data retrieved from the database with UID key
 * @param userTeams teams data retrieved from the single user subscriptions
 * @param teams all teams data retrieved from the database collection
 * @returns
 */
const LandingPageMainSection = ({ userData, userTeams, teams }: Props) => {
  const authenticatedUser = useAuthCtx()
  const [showNewTeamForm, setShowNewTeamForm] = useState(false)

  // Filter teams that the user is not subscribed to
  // This is done to show only the teams that the user can subscribe to
  const filteredTeams = teams.filter((team) => {
    return userData.subscriptions?.some(
      (subscription) => subscription.teamId !== team.id
    )
  })

  return (
    <>
      <div id='user-info'>
        <p>UID: {authenticatedUser?.uid}</p>
        <p>Email: {authenticatedUser?.email}</p>
      </div>
      <div className='flex flex-col gap-1'>
        <button
          className='rounded-xl border-2 border-white/[.145] p-2 w-full'
          onClick={() => setShowNewTeamForm(!showNewTeamForm)}
        >
          Create new team
        </button>
        {showNewTeamForm && <NewTeamForm />}
      </div>
      <UserSubscriptions userTeams={userTeams} />
      <AvailableTeams teams={userTeams.length === 0 ? teams : filteredTeams} />
    </>
  )
}

export default LandingPageMainSection
