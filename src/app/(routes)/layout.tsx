import Breadcrumbs from '@/components/Navigation/Breadcrumbs'
import Header from '@/components/Navigation/Header'
import RoutesWrapper from '@/components/RoutesWrapper'
import { type ReactNode } from 'react'

const RoutesLayout = ({ children }: { children: ReactNode }) => {
  return (
    <RoutesWrapper>
      <Header />
      <Breadcrumbs />
      <section className='flex flex-col gap-2 px-2 py-6 pb-12'>{children}</section>
    </RoutesWrapper>
  )
}

export default RoutesLayout
