'use client'

import { useTeamCtx } from '@/app/context/team-context'
import classes from './styles.module.css'
import MemberCard from './MemberCard'
import { useAuthCtx } from '@/app/context/auth-context'
import { api } from '@/lib/utils/api-client'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const TeamMembers = () => {
  const { teamData } = useTeamCtx()
  const authenticatedUser = useAuthCtx()
  const router = useRouter()

  // remove the authenticated user from the list of team members
  const filteredMembersWOAuthUser = teamData.members.filter(
    (m) => m.uid !== authenticatedUser?.uid
  )

  const handleMemberActions = (
    action: 'PROMOTE' | 'REVOKE',
    memberUid: string
  ) => {
    switch (action) {
      case 'PROMOTE':
        api
          .get(`/users/${memberUid}/manage-access/promote?teamId=${teamData.id}`)
          .catch((err) => {
            toast.error(err)
          })
          .finally(() => {
            router.refresh()
          })
        break

      case 'REVOKE':
        api
          .get(`/users/${memberUid}/manage-access/revoke?teamId=${teamData.id}`)
          .catch((err) => {
            toast.error(err)
          })
          .finally(() => {
            router.refresh()
          })
        break

      default:
        console.error('Invalid action type')
        break
    }
  }

  return (
    <div>
      <p>Team Members:</p>
      <ul className={classes.members__list}>
        {filteredMembersWOAuthUser.map((m) => (
          <MemberCard
            key={m.uid}
            member={m}
            onTriggerAction={(action) => handleMemberActions(action, m.uid)}
          />
        ))}
      </ul>
    </div>
  )
}

export default TeamMembers
