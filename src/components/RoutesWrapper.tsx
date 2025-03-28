'use client'

import { usePathname } from 'next/navigation'
import { type ReactNode } from 'react'
import { AnimatePresence } from 'motion/react'
import { motion } from 'motion/react'

/**
 * AnimatedWrapper component that wraps its children with a starting animation.
 *
 * This component uses `AnimatePresence` and `motion.section` from Framer Motion
 * to animate every page based on the current pathname.
 * The `motion.section` component gets re-evaluated every time the pathname changes.
 *
 */
const RoutesWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const useAnimation = true

  return (
    <AnimatePresence mode='wait'>
      <motion.section
        key={pathname}
        {...(useAnimation && {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.5 },
        })}
      >
        {children}
      </motion.section>
    </AnimatePresence>
  )
}

export default RoutesWrapper
