'use client'

import {
  DialogTitle,
  IconButton,
  Dialog as MuiDialog,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { type PropsWithChildren } from 'react'
import { CloseRounded } from '@mui/icons-material'

type Props = PropsWithChildren & { title: string }

const Dialog = ({ children, ...props }: Props) => {
  const router = useRouter()

  const close = () => router.back()

  return (
    <MuiDialog open onClose={close} fullWidth maxWidth='xl'>
      <DialogTitle
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p>{props.title}</p>
        <IconButton aria-label='close' onClick={close} className='ml-auto'>
          <CloseRounded />
        </IconButton>
      </DialogTitle>
      {children}
    </MuiDialog>
  )
}

export default Dialog
