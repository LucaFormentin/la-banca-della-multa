import { Teams } from "@/lib/classes/Teams"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ teamId: string }> }
) {
  const { teamId } = await params

  const teamsC = new Teams()
  const teamData = await teamsC.findTeamById(teamId)

  if (!teamData) {
    return Response.json({ error: 'User not found!' }, { status: 404 })
  }

  return Response.json({ data: teamData })
}
