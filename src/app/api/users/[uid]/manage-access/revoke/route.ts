import { Team, type TeamMemberT, Teams } from '@/lib/classes/Teams'
import { type SubscriptionT, User, Users } from '@/lib/classes/Users'
import { type NextRequest } from 'next/server'

async function updateTeamMembers(
  teamKey: string,
  currentMembers: TeamMemberT[],
  uidToRemove: string
) {
  let updatedTeamMembers = currentMembers.filter(
    (member) => member.uid !== uidToRemove
  )

  const teamC = new Team(teamKey)
  await teamC.updateMembers(updatedTeamMembers)
}

async function updateUserSubscriptions(
  userKey: string,
  currentSubscriptions: SubscriptionT[],
  teamIdToRemove: string
) {
  let updatedSubscriptions = currentSubscriptions.filter(
    (sub) => sub.teamId !== teamIdToRemove
  )

  const userC = new User(userKey)
  await userC.updateSubscriptions(updatedSubscriptions)
}

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

  await updateTeamMembers(teamData.key!, teamData.members || [], uid)

  await updateUserSubscriptions(
    userData.key!,
    userData.subscriptions || [],
    teamId
  )

  return Response.json({ data: 'ok' })
}
