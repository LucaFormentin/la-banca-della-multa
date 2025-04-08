import { Teams, type TeamT } from '@/lib/classes/Teams'
import { type SubscriptionT, User, Users } from '@/lib/classes/Users'

/**
 * 
 * @param req - request object containing the team data to be created
 * @returns 
 * @description This function handles the creation of a new team and updates the subscriptions of each user in the team.
 * It first creates a new team in the database and then iterates through each member of the team to update their subscriptions.
 */
export async function POST(req: Request) {
  const data = (await req.json()) as TeamT

  // create new team
  const teamsC = new Teams()
  await teamsC.create(data)

  // Add team subscriptions to each user in the team
  const usersC = new Users()
  data.members.forEach(async (member) => {
    const u = await usersC.findUserByUid(member.uid)

    if (!u) {
      return new Response(`User not found witj UID: ${member.uid}`, {
        status: 404,
      })
    }

    let newSubscription: SubscriptionT = {
      teamId: data.id,
      role: member.role,
    }
    let subscriptions = u.subscriptions || []
    let updatedSubscriptions = [...subscriptions, newSubscription]

    const userC = new User(u.key!)
    await userC.updateSubscriptions(updatedSubscriptions)
  })

  return Response.json({ data: `Team created: ${data.name}` })
}
