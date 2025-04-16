import { Team, type TeamMemberT, Teams } from '@/lib/classes/Teams'
import {
  PendingSubscriptionT,
  type SubscriptionT,
  User,
  Users,
} from '@/lib/classes/Users'
import { type NextRequest } from 'next/server'

async function updateTeamMembers(
  teamKey: string,
  currentMembers: TeamMemberT[],
  newMemberUid: string
) {
  let newMember: TeamMemberT = {
    uid: newMemberUid,
    role: 'GUEST',
  }

  let updatedMembers = [...currentMembers, newMember]

  const teamC = new Team(teamKey)
  await teamC.updateMembers(updatedMembers)
}

async function updateUserSubscriptions(
  userKey: string,
  currentSubscriptions: SubscriptionT[],
  newTeamId: string
) {
  let newSubscription: SubscriptionT = {
    teamId: newTeamId,
    role: 'GUEST',
  }

  let updatedSubscriptions = [...currentSubscriptions, newSubscription]

  const userC = new User(userKey)
  await userC.updateSubscriptions(updatedSubscriptions)
}

async function updateUserPendingSubscriptions(
  userKey: string,
  currentPendingSubs: PendingSubscriptionT[],
  newTeamId: string
) {
  let updatedPendingSubscriptions = currentPendingSubs.filter(
    (curr) => curr.teamId !== newTeamId
  )

  const usersC = new User(userKey)
  await usersC.updatePendingSubscriptions(updatedPendingSubscriptions)
}

/**
 *
 * @param req - request object containing the teamId and applicantEmail
 * @returns redirection to main page
 * @description This function handles the acceptance of a join request for a team.
 * It updates the team members and user subscriptions accordingly.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const teamId = searchParams.get('teamId')
  const applicantEmail = searchParams.get('applicantEmail')

  if (!teamId || !applicantEmail) {
    return Response.json({ error: 'Missing required info...' }, { status: 400 })
  }

  const usersC = new Users()
  const userData = await usersC.findUserByEmail(applicantEmail)

  const teamsC = new Teams()
  const teamData = await teamsC.findTeamById(teamId)

  if (!userData || !teamData) {
    return Response.json(
      { error: 'Something wrong on fetching data from db...' },
      { status: 404 }
    )
  }

  await updateTeamMembers(teamData.key!, teamData.members || [], userData.uid)

  await updateUserSubscriptions(
    userData.key!,
    userData.subscriptions || [],
    teamData.id
  )

  await updateUserPendingSubscriptions(
    userData.key!,
    userData.pendingSubscriptions || [],
    teamData.id
  )

  return Response.redirect('http://192.168.1.170:3000')
}
