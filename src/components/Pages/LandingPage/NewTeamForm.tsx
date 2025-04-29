import { useForm } from '@tanstack/react-form'
import { type FormEvent } from 'react'
import classes from './styles.module.css'
import { api } from '@/lib/utils/api-client'
import { type TeamT } from '@/lib/classes/Teams'
import { useAuthCtx } from '@/app/context/auth-context'
import { generateRandomStr, getCurrentDateTime } from '@/lib/utils/helpers'
import toast from 'react-hot-toast'
import InputWrapper from '@/components/Templates/InputWrapper'

type Props = {
  onTeamCreated: () => void
}

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
        .finally(() => {
          props.onTeamCreated()
          form.reset()
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
          <InputWrapper label='Nome squadra' labelHtmlRef='name'>
            <input
              type='text'
              placeholder='Inserisci nome'
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              required
            />
          </InputWrapper>
        )}
      />
      <form.Field
        name='location'
        children={(field) => (
          <InputWrapper label='Città' labelHtmlRef='location'>
            <input
              type='text'
              placeholder='Inserisci città'
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </InputWrapper>
        )}
      />
      <form.Field
        name='color'
        children={(field) => (
          <InputWrapper label='Colore principale' labelHtmlRef='color'>
            <input
              type='color'
              placeholder='Colore principale'
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              required
            />
          </InputWrapper>
        )}
      />
      <form.Field
        name='logo'
        children={(field) => (
          <InputWrapper label='Logo' labelHtmlRef='logo'>
            <input
              type='text'
              placeholder='Scegli logo'
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </InputWrapper>
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
