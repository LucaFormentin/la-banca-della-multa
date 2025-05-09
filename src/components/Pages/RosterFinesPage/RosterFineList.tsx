'use client'

import { useTeamCtx } from '@/app/context/team-context'
import useUserRole from '@/app/hooks/useUserRole'
import RosterMember from './RosterMember'

const RosterFineList = () => {
  const { teamData } = useTeamCtx()
  const { userRole } = useUserRole()

  const roster = [
    ...(teamData.roster?.players.sort((a, b) => a.number - b.number) || []),
    ...(teamData.roster?.staff || []),
  ]

  if (roster.length === 0) {
    return <p>Roster is currently empty.</p>
  }

  const isAlphaUser = userRole === 'SUPER' || userRole === 'ADMIN'

  return (
    <ul className='flex flex-col gap-4'>
      {roster.map((member) => (
        <RosterMember key={member.id} isAlphaUser={isAlphaUser} data={member} />
      ))}
    </ul>
  )
}

export default RosterFineList
