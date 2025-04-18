'use client'

import { useTeamCtx } from '@/app/context/team-context'

const TeamMembers = () => {
  const { teamData } = useTeamCtx()

  return (
    <div>
      <p>Team Members:</p>
      <ul>
        {teamData.members.map((member) => (
          <li key={member.uid}>{member.uid} - {member.role}</li>
        ))}
      </ul>
    </div>
  )
}

export default TeamMembers
