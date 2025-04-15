import { Users } from "@/lib/classes/Users"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ uid: string }> }
) {
  const { uid } = await params

  const usersC = new Users()
  const userData = await usersC.findUserByUid(uid)

  if (!userData) {
    return Response.json({ error: 'User not found!' }, { status: 404 })
  }

  return Response.json({ data: userData })
}
