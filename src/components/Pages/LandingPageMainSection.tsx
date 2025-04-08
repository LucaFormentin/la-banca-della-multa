'use client'

import { useAuthCtx } from '@/app/context/auth-context'
import { type AuthenticatedUserT } from '@/lib/classes/Users'
import NewTeamForm from './NewTeamForm'
import { useState } from 'react'

type Props = {
  // userData: user data retrieved from the database with team subscriptions info
  userData: AuthenticatedUserT
}

const LandingPageMainSection = ({ userData }: Props) => {
  const authenticatedUser = useAuthCtx()
  const [showNewTeamForm, setShowNewTeamForm] = useState(false)

  return (
    <>
      <div id='user-info'>
        <p>UID: {authenticatedUser?.uid}</p>
        <p>Email: {authenticatedUser?.email}</p>
      </div>
      <button
        className='rounded-xl border-2 border-white/[.145] p-2'
        onClick={() => setShowNewTeamForm(!showNewTeamForm)}
      >
        Create new team
      </button>
      {showNewTeamForm && <NewTeamForm />}
      <div>
        <p>User subscriptions:</p>
        <ul>{userData.subscriptions?.map((item, index) => <li key={index}>team id: {item.teamId}</li>)}</ul>
      </div>
      <div>
        <p>Available teams:</p>
        <p>... get all teams from db ...</p>
      </div>
    </>
  )
}

export default LandingPageMainSection
