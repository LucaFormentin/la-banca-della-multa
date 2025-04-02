import AuthController from "@/components/AuthController";

export default function Home() {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <main className='flex flex-col gap-4 items-center justify-center'>
        <p>La Banca della Multa</p>
        <AuthController />
      </main>
    </div>
  )
}
