'use client'

import theme from '@/config/mui-config'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { type ReactNode } from 'react'

const MuiProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
      <CssBaseline />
    </ThemeProvider>
  )
}

export default MuiProvider
