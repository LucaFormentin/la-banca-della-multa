import {
  type FineT,
  Team,
  Teams,
} from '@/lib/classes/Teams'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ teamId: string }> }
) {
  const { teamId } = await params
  const fineData: FineT = await req.json()

  const teamsC = new Teams()
  const teamData = await teamsC.findTeamById(teamId)

  if (!teamData) {
    return Response.json({ error: 'Team not found' }, { status: 404 })
  }

  let currentFines = teamData.fines || []
  let updatedFines = [...currentFines, fineData]

  const teamC = new Team(teamData.key!)
  await teamC.addFine(updatedFines)

  return Response.json({ data: 'ok' })
}
