import Header from '@/components/Header'

export default async function LandingPage({
  params,
}: {
  params: Promise<{ uid: string }>
}) {
  const { uid } = await params

  if (!uid || uid === undefined) {
    return <p>Invalid UID...</p>
  }

  return (
    <>
      <Header />
      <p>Landing Page</p>
    </>
  )
}
