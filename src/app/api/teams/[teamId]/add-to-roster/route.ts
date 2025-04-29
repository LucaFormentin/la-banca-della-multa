import { type MemberDataT } from '@/components/Pages/TeamManagerPage/NewRosterMemberForm'
import {
  Team,
  Teams,
  type RosterMember,
} from '@/lib/classes/Teams'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ teamId: string }> }
) {
  const { teamId } = await params
  const { type, data }: MemberDataT = await req.json()

  const teamsC = new Teams()
  const teamData = await teamsC.findTeamById(teamId)

  if (!teamData) {
    return Response.json({ error: 'Team not found' }, { status: 404 })
  }

  const teamC = new Team(teamData.key!)

  if (type === 'PLAYER') {
    let mD = data as RosterMember<'PLAYER'>

    let updatedPlayers = [...(teamData.roster?.players || []), mD]
    await teamC.addPlayerToRoster(updatedPlayers)
  }

  if (type === 'STAFF') {
    let mD = data as RosterMember<'STAFF'>

    let updatedStaff = [...(teamData.roster?.staff || []), mD]
    await teamC.addStaffToRoster(updatedStaff)
  }

  return Response.json({ data: 'ok' })
}
