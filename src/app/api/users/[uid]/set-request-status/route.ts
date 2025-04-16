import { type NextRequest } from "next/server"
import { type PendingSubscriptionT, User, Users } from "@/lib/classes/Users"

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

  const usersC = new Users()
  const userData = await usersC.findUserByUid(uid)

  let currentPendingSubscriptions = userData!.pendingSubscriptions || []
  
  let newPendingSubscription: PendingSubscriptionT = {
    teamId: teamId!,
    requestStatus: 'PENDING',
  }

  let updatedPendingSubscriptions = [...currentPendingSubscriptions, newPendingSubscription]

  const userC = new User(userData!.key!)
  await userC.updatePendingSubscriptions(updatedPendingSubscriptions)

  return Response.json({ data: 'ok' })
}
