import { Team, Teams } from '@/lib/classes/Teams'
import { type NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ teamId: string; memberId: string }> }
) {
  const { teamId, memberId } = await params

  const sParams = req.nextUrl.searchParams
  const fineId = sParams.get('fineId')

  if (!fineId) {
    return Response.json({ error: 'Fine ID is required' }, { status: 400 })
  }

  const teamsC = new Teams()
  const teamData = await teamsC.findTeamById(teamId)

  if (!teamData) {
    return Response.json({ error: 'User not found!' }, { status: 404 })
  }

  const teamC = new Team(teamData.key!)
  await teamC.addFineToRosterMember(memberId, fineId)

  return Response.json({ data: teamData })
}
