import Header from '@/components/Navigation/Header'
import LandingPageMainSection from '@/components/Pages/LandingPageMainSection'
import { Users } from '@/lib/classes/Users'

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

  return (
    <>
      <Header />
      <section className='flex flex-col gap-4 p-2'>
        <LandingPageMainSection userData={user} />
      </section>
    </>
  )
}
