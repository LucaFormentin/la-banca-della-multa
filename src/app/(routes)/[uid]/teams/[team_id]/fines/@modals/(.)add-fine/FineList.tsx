'use client'

import { type FineT } from '@/lib/classes/Teams'
import { api } from '@/lib/utils/api-client'
import {
  Button,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

type Props = {
  teamId: string
  fines: FineT[]
}

const FineList = ({ teamId, fines }: Props) => {
  const [radioGroupVal, setRadioGroupVal] = useState<string | null>(null)
  const sParams = useSearchParams()
  const router = useRouter()

  const close = () => router.back()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioGroupVal(event.target.value)
  }

  const selectFine = () => {
    let memberId = sParams.get('memberId')
    let selectedFineId = radioGroupVal

    api
      .get(`/teams/${teamId}/${memberId}/add-fine?fineId=${selectedFineId}`)
      .catch((err) => {
        toast.error(err)
      })
      .finally(() => {
        toast.success('Multa aggiunta con successo!')
        close()
      })
  }

  return (
    <>
      <DialogContent dividers>
        <RadioGroup
          name='fineList'
          value={radioGroupVal}
          onChange={handleChange}
        >
          {fines.map((fine) => (
            <FormControlLabel
              key={fine.id}
              value={fine.id}
              label={fine.name}
              control={<Radio />}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Annulla</Button>
        <Button onClick={selectFine} disabled={!radioGroupVal}>
          Seleziona
        </Button>
      </DialogActions>
    </>
  )
}

export default FineList
