import { Teams } from "@/lib/classes/Teams"

export default async function TeamPage({
  params,
}: {
  params: Promise<{ team_id: string }>
}) {
  const { team_id } = await params

  if (!team_id || team_id === undefined) {
    return <p>Invalid Team ID...</p>
  }

  const teamsC = new Teams()
  const teamData = await teamsC.findTeamById(team_id)

  return <div>Welcome to {teamData?.name}</div>
}
