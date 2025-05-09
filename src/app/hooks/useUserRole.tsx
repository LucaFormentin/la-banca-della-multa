'use client'

import { useEffect, useState } from 'react'
import { useAuthCtx } from '../context/auth-context'
import { useTeamCtx } from '../context/team-context'

/**
 * 
 * @returns user role of the authenticated user in the team context
 */
const useUserRole = () => {
  const { teamData } = useTeamCtx()
  const authenticatedUser = useAuthCtx()
  const [userRole, setUserRole] = useState<'SUPER' | 'ADMIN' | 'GUEST' | null>(
    null
  )

  useEffect(() => {
    // set user role based on authenticated user
    teamData.members.find((member) => {
      if (member.uid === authenticatedUser?.uid) {
        setUserRole(member.role)
      }
    })
  }, [])

  return { userRole }
}

export default useUserRole
