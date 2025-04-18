'use client'

import { type TeamT } from '@/lib/classes/Teams'
import { createContext, type PropsWithChildren, useContext } from 'react'

type TeamContextProviderProps = PropsWithChildren<{
  teamData: TeamT
}>

const TeamContext = createContext<TeamContextProviderProps | null>(null)

const useTeamCtx = () => {
  const ctx = useContext(TeamContext)

  if (!ctx) {
    throw new Error('useTeamCtx must be used within a TeamContextProvider')
  }

  return ctx
}

/**
 * 
 * @param param0 - teamData: The team data retrieved from the database with ID key
 * @returns - TeamContextProvider: Provides the team data to the context
 */
const TeamContextProvider = ({
  teamData,
  children,
}: TeamContextProviderProps) => {
  const teamCtxValue = { teamData }

  return (
    <TeamContext.Provider value={teamCtxValue}>{children}</TeamContext.Provider>
  )
}

export { useTeamCtx, TeamContextProvider }
