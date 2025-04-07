import { signInWithGoogle } from '@/lib/firebase/auth'
import { LANDING_PAGE } from '@/lib/routes'
import { type UserCredential } from 'firebase/auth'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { type MouseEvent } from 'react'
import classes from './auth.module.css'

const SignInGoogleBtn = () => {
  const router = useRouter()

  const handleSignInWithGoogle = async (e: MouseEvent) => {
    e.preventDefault()

    signInWithGoogle()
      .then(({ user }: UserCredential) => {
        const { uid } = user
        router.push(`/${uid}/${LANDING_PAGE}`)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <button
      className={classes.google__btn}
      onClick={handleSignInWithGoogle}
    >
      <Image
        src={'/assets/google.png'}
        alt='Google'
        width={20}
        height={20}
        className='inline-block mr-2'
      />
      Sign In with Google
    </button>
  )
}

export default SignInGoogleBtn
