import AuthController from '@/components/Auth/AuthController'
import Image from 'next/image'

export default function Home() {
  return (
    <main className='grid grid-rows-[auto_2fr] w-full min-h-screen'>
      <div className='w-full flex flex-col gap-8 p-12 justify-center items-center'>
        <Image
          src={'/assets/android-chrome-512x512.png'}
          alt='logo-512x512'
          width={128}
          height={128}
        />
        <p className='text-5xl font-semibold text-center'>La Banca della Multa</p>
      </div>
      <AuthController />
    </main>
  )
}
