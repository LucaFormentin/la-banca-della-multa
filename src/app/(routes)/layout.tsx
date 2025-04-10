import Header from '@/components/Navigation/Header'
import RoutesWrapper from '@/components/RoutesWrapper'
import { type ReactNode } from 'react'

const RoutesLayout = ({ children }: { children: ReactNode }) => {
  return (
    <RoutesWrapper>
      <Header />
      {children}
    </RoutesWrapper>
  )
}

export default RoutesLayout
