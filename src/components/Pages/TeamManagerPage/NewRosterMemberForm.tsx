import { useForm } from '@tanstack/react-form'
import { type FormEvent, useState } from 'react'
import classes from './styles.module.css'
import { FormControl, MenuItem, Select } from '@mui/material'
import type {
  PlayerT,
  RosterMember,
  StaffT,
  RosterMemberTypes,
} from '@/lib/classes/Teams'
import { capitalizeFirstLetter, generateRandomStr } from '@/lib/utils/helpers'
import InputWrapper from '@/components/Templates/InputWrapper'

export type MemberDataT = {
  type: RosterMemberTypes
  data: RosterMember<RosterMemberTypes>
}

type Props = {
  onFormSubmit: (memberData: MemberDataT) => void
}

const NewRosterMemberForm = (props: Props) => {
  const form = useForm({
    defaultValues: {
      memberType: '' as RosterMemberTypes,
      lastName: '',
      firstName: '',
      number: '',
      role: '',
    },
    onSubmit: ({ value }) => {
      let commonData = {
        id: generateRandomStr(12),
        lastName: value.lastName,
        firstName: value.firstName,
      }

      const memberData: MemberDataT =
        value.memberType === 'PLAYER'
          ? {
              type: 'PLAYER',
              data: {
                ...commonData,
                number: Number(value.number),
                role: value.role as PlayerT['role'],
              },
            }
          : {
              type: 'STAFF',
              data: {
                ...commonData,
                role: value.role as StaffT['role'],
              },
            }

      props.onFormSubmit(memberData)
      form.reset()
    },
  })

  const [memberTypeSelected, setMemberTypeSelected] =
    useState<RosterMemberTypes | null>(null)

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
        name='memberType'
        children={(field) => (
          <InputWrapper label='Tipo' labelHtmlRef='memberType'>
            <FormControl size='small' sx={{ minWidth: 120 }}>
              <Select
                required
                displayEmpty
                onChange={(e) => {
                  let selectedValue = e.target.value as RosterMemberTypes
                  field.handleChange(selectedValue)
                  setMemberTypeSelected(selectedValue)
                }}
                value={field.state.value}
                renderValue={(selected) =>
                  selected
                    ? capitalizeFirstLetter(selected as string)
                    : 'Seleziona'
                }
              >
                <MenuItem value='PLAYER'>Player</MenuItem>
                <MenuItem value='STAFF'>Staff</MenuItem>
              </Select>
            </FormControl>
          </InputWrapper>
        )}
      />
      <form.Field
        name='lastName'
        children={(field) => (
          <InputWrapper label='Cognome' labelHtmlRef='lastName'>
            <input
              type='text'
              placeholder='Inserisci cognome'
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              required
            />
          </InputWrapper>
        )}
      />
      <form.Field
        name='firstName'
        children={(field) => (
          <InputWrapper label='Nome' labelHtmlRef='firstName'>
            <input
              type='text'
              placeholder='Inserisci nome'
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </InputWrapper>
        )}
      />
      {memberTypeSelected === 'PLAYER' && (
        <>
          <form.Field
            name='number'
            children={(field) => (
              <InputWrapper label='Numero Divisa' labelHtmlRef='number'>
                <input
                  type='number'
                  placeholder='Numero divisa'
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  required
                />
              </InputWrapper>
            )}
          />
          <form.Field
            name='role'
            children={(field) => (
              <InputWrapper label='Ruolo' labelHtmlRef='role'>
                <FormControl size='small' sx={{ minWidth: 120 }}>
                  <Select
                    required
                    displayEmpty
                    onChange={(e) => field.handleChange(e.target.value)}
                    value={field.state.value}
                    renderValue={(selected) =>
                      selected
                        ? capitalizeFirstLetter(selected as string)
                        : 'Seleziona'
                    }
                  >
                    <MenuItem value='PLAY'>Play</MenuItem>
                    <MenuItem value='GUARDIA'>Guardia</MenuItem>
                    <MenuItem value='ALA'>Ala</MenuItem>
                    <MenuItem value='CENTRO'>Centro</MenuItem>
                  </Select>
                </FormControl>
              </InputWrapper>
            )}
          />
        </>
      )}
      {memberTypeSelected === 'STAFF' && (
        <>
          <form.Field
            name='role'
            children={(field) => (
              <InputWrapper label='Ruolo' labelHtmlRef='role'>
                <FormControl size='small' sx={{ minWidth: 120 }}>
                  <Select
                    required
                    displayEmpty
                    onChange={(e) => field.handleChange(e.target.value)}
                    value={field.state.value}
                    renderValue={(selected) =>
                      selected
                        ? capitalizeFirstLetter(selected as string)
                        : 'Seleziona'
                    }
                  >
                    <MenuItem value='COACH'>Coach</MenuItem>
                    <MenuItem value='ASSISTENTE'>Assistente</MenuItem>
                    <MenuItem value='DIRIGENTE'>Dirigente</MenuItem>
                  </Select>
                </FormControl>
              </InputWrapper>
            )}
          />
        </>
      )}
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

export default NewRosterMemberForm
