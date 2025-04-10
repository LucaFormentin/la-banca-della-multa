import LandingPageMainSection from '@/components/Pages/LandingPage/LandingPageMainSection'
import { Teams } from '@/lib/classes/Teams'
import { User, Users } from '@/lib/classes/Users'

export default async function LandingPage({
  params,
}: {
  params: Promise<{ uid: string }>
}) {
  const { uid } = await params

  if (!uid || uid === undefined) {
    return <p>Invalid UID...</p>
  }

  const usersC = new Users()
  const user = await usersC.findUserByUid(uid)

  if (!user) {
    return <p>User not found...</p>
  }

  const userC = new User(user.key!)
  const userTeams = await userC.getTeamDataFromSubscriptions()

  const teamsC = new Teams()
  const allTeams = await teamsC.get()

  return (
    <LandingPageMainSection
      userData={user}
      userTeams={userTeams}
      teams={allTeams}
    />
  )
}
