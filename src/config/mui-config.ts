'use client'

import { inter } from '@/app/fonts/config'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
})

export default theme
