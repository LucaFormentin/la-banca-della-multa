import RoutesWrapper from '@/components/RoutesWrapper'
import { type ReactNode } from 'react'

const RoutesLayout = ({ children }: { children: ReactNode }) => {
  return <RoutesWrapper>{children}</RoutesWrapper>
}

export default RoutesLayout
