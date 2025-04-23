import { Team, type TeamMemberT, Teams } from '@/lib/classes/Teams'
import { type SubscriptionT, User, Users } from '@/lib/classes/Users'
import { type NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  const { uid } = await params
  const { searchParams } = req.nextUrl
  const teamId = searchParams.get('teamId')

  if (!teamId) {
    return Response.json({ error: 'Missing teamId' }, { status: 400 })
  }

  const teamsC = new Teams()
  const teamData = await teamsC.findTeamById(teamId)

  const usersC = new Users()
  const userData = await usersC.findUserByUid(uid)

  if (!userData || !teamData) {
    return Response.json(
      { error: 'Something wrong on fetching data from db...' },
      { status: 404 }
    )
  }

  const updatedTeamMembers = teamData.members.map((member) =>
    member.uid === uid ? { ...member, role: 'ADMIN' } : member
  ) as TeamMemberT[]

  const updatedSubscriptions = userData.subscriptions?.map((sub) =>
    sub.teamId === teamId ? { ...sub, role: 'ADMIN' } : sub
  ) as SubscriptionT[]

  const teamC = new Team(teamData.key!)
  await teamC.updateMembers(updatedTeamMembers)

  const userC = new User(userData.key!)
  await userC.updateSubscriptions(updatedSubscriptions)

  return Response.json({ data: 'ok' })
}
