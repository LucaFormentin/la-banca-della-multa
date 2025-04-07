import { useForm } from '@tanstack/react-form'
import { FormEvent } from 'react'
import classes from './auth.module.css'
import { createUserWithEmailAndPassword } from '@/lib/firebase/auth'
import toast from 'react-hot-toast'

type Props = {
  onFormSubmit: () => void
}

const SignUpPasswordForm = (props: Props) => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
    onSubmit: async ({ value }) => {
      createUserWithEmailAndPassword(value.email, value.password)
        .then(() => {
          // redirect to signin form
          props.onFormSubmit()
          toast.success('User successfully created!')
        })
        .catch((error) => {
          console.error(error)
        })
    },
    validators: {
      onSubmitAsync: async ({ value }) => {
        if (value.password.length < 6) {
          return 'Password must be at least 6 characters long!'
        }

        if (value.confirm_password !== value.password) {
          return 'Passwords do not match!'
        }

        //TODO: check if user already exists

        return undefined
      },
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
      <form.Field
        name='confirm_password'
        children={(field) => (
          <input
            type='password'
            placeholder='Re-enter Password'
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            required
          />
        )}
      />
      <form.Subscribe
        selector={(state) => [state.errorMap]}
        children={([errorMap]) =>
          errorMap.onSubmit ? (
            <span className={classes.auth__form__error}>
              Error: {errorMap.onSubmit.toString()}
            </span>
          ) : null
        }
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
            {isSubmitting ? '...' : 'Sign Up'}
          </button>
        )}
      />
    </form>
  )
}

export default SignUpPasswordForm
