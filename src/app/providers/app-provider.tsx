import { type ReactNode } from 'react'
import TanStackProvider from './tanstack-provider'
import MuiProvider from './mui-provider'
import { Toaster } from 'react-hot-toast'

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <TanStackProvider>
      <MuiProvider>
        {children}
        <Toaster />
      </MuiProvider>
    </TanStackProvider>
  )
}

export default AppProvider
