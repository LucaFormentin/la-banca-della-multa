import { TeamContextProvider } from '@/app/context/team-context'
import { Teams } from '@/lib/classes/Teams'

/**
 *
 * @param params - team_id: The team ID retrieved from the URL parameters
 * @returns - TeamsLayout: The layout component for the team page with the team data
 * @description - This component fetches the team data based on the team ID from the db and provides it to the context for use in child components.
 */
export default async function TeamsLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ team_id: string }>
}>) {
  const { team_id } = await params

  if (!team_id || team_id === undefined) {
    return <p>Invalid Team ID...</p>
  }

  const teamsC = new Teams()
  const teamData = await teamsC.findTeamById(team_id)

  if (!teamData) {
    return <p>Team not found...</p>
  }

  return (
    <TeamContextProvider teamData={teamData}>
      <p>Squadra selezionata: {teamData.name}</p>
      {children}
    </TeamContextProvider>
  )
}
