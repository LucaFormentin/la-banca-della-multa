'use client'

import { baloo2 } from '@/app/fonts/config'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: baloo2.style.fontFamily,
  },
})

export default theme
