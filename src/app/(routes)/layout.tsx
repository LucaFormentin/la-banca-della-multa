import Header from '@/components/Navigation/Header'
import RoutesWrapper from '@/components/RoutesWrapper'
import { type ReactNode } from 'react'

const RoutesLayout = ({ children }: { children: ReactNode }) => {
  return (
    <RoutesWrapper>
      <Header />
      <section className='flex flex-col gap-4 p-2 pb-12'>{children}</section>
    </RoutesWrapper>
  )
}

export default RoutesLayout
