import InputWrapper from '@/components/Templates/InputWrapper'
import { type FineT } from '@/lib/classes/Teams'
import { generateRandomStr } from '@/lib/utils/helpers'
import { useForm } from '@tanstack/react-form'
import { type FormEvent } from 'react'

type Props = {
  onFormSubmit: (fineData: FineT) => void
}

const NewFineForm = (props: Props) => {
  const form = useForm({
    defaultValues: {
      name: '',
      amount: '',
    },
    onSubmit: ({ value }) => {
      let fine: FineT = {
        id: generateRandomStr(12),
        name: value.name,
        amount: Number(value.amount),
      }

      props.onFormSubmit(fine)
      form.reset()
    },
  })

  return (
    <form
      className='flex flex-col items-center gap-2 w-full bg-white/[.145] rounded-lg p-4'
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()
        void form.handleSubmit()
      }}
    >
      <form.Field
        name='name'
        children={(field) => (
          <InputWrapper label='Nome' labelHtmlRef='name'>
            <input
              type='text'
              placeholder='Inserisci multa'
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              required
            />
          </InputWrapper>
        )}
      />
      <form.Field
        name='amount'
        children={(field) => (
          <InputWrapper label='Importo' labelHtmlRef='amount'>
            <input
              type='number'
              placeholder='Inserisci importo'
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              required
            />
          </InputWrapper>
        )}
      />
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <button
            className='bg-blue-500 text-white rounded-md p-2 w-1/2 mt-4'
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

export default NewFineForm
