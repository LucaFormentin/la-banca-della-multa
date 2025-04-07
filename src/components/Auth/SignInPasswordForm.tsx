import { useForm } from '@tanstack/react-form'
import { FormEvent } from 'react'
import classes from './auth.module.css'
import { signInWithEmailAndPassword } from '@/lib/firebase/auth'
import { type UserCredential } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { LANDING_PAGE } from '@/lib/routes'

const SignInPasswordForm = () => {
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      signInWithEmailAndPassword(value.email, value.password)
        .then(({ user }: UserCredential) => {
          const { uid } = user
          router.push(`/${uid}/${LANDING_PAGE}`)
        })
        .catch((error) => {
          console.error(error)
        })
    },
  })

  return (
    <form
      className={classes.auth__form}
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()
        void form.handleSubmit()
      }}
    >
      <form.Field
        name='email'
        children={(field) => (
          <input
            type='email'
            placeholder='Email'
            name={field.name}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            required
          />
        )}
      />
      <form.Field
        name='password'
        children={(field) => (
          <input
            type='password'
            placeholder='Password'
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            required
          />
        )}
      />
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <button
            id='signin-btn'
            className={classes.subscribe__btn}
            type='submit'
            disabled={!canSubmit}
          >
            {isSubmitting ? '...' : 'Sign In'}
          </button>
        )}
      />
    </form>
  )
}

export default SignInPasswordForm
