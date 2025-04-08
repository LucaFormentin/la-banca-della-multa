import { useForm } from '@tanstack/react-form'
import { type FormEvent } from 'react'
import classes from './pages.module.css'
import { api } from '@/lib/utils/api-client'
import { type TeamT } from '@/lib/classes/Teams'
import { useAuthCtx } from '@/app/context/auth-context'
import { generateRandomStr, getCurrentDateTime } from '@/lib/utils/helpers'
import toast from 'react-hot-toast'

type Props = {}

const NewTeamForm = (props: Props) => {
  const authenticatedUser = useAuthCtx()

  const form = useForm({
    defaultValues: {
      name: '',
      location: '',
      color: '',
      logo: '',
    },
    onSubmit: ({ value }) => {
      // authenticatedUser uid is used to set the team admin
      const teamData: TeamT = {
        id: generateRandomStr(12),
        createdAt: getCurrentDateTime(),
        ...value,
        members: [
          {
            uid: authenticatedUser!.uid,
            role: 'ADMIN',
          },
        ],
      }
      

      // fetch API to create a new team in DB
      api
        .post('/teams/create', teamData)
        .then((res: any) => {
          toast.success(res.data)
        })
        .catch((err) => {
          console.error('Error creating team:', err)
        })
    },
  })

  return (
    <form
      className={classes.form__wrapper}
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()
        void form.handleSubmit()
      }}
    >
      <form.Field
        name='name'
        children={(field) => (
          <input
            type='text'
            placeholder='Nome squadra'
            name={field.name}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            required
          />
        )}
      />
      <form.Field
        name='location'
        children={(field) => (
          <input
            type='text'
            placeholder='Città'
            name={field.name}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        )}
      />
      <form.Field
        name='color'
        children={(field) => (
          <input
            type='color'
            placeholder='Colore principale'
            name={field.name}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            required
          />
        )}
      />
      <form.Field
        name='logo'
        children={(field) => (
          <input
            type='text'
            placeholder='Logo squadra'
            name={field.name}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        )}
      />
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <button
            className={classes.subscribe__btn}
            id='create-btn'
            type='submit'
            disabled={!canSubmit}
          >
            {isSubmitting ? '...' : 'Create'}
          </button>
        )}
      />
    </form>
  )
}

export default NewTeamForm
