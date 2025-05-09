'use client'

import React from 'react'

const FinesLayout = ({
  children,
  modals,
}: {
  children: React.ReactNode
  modals: React.ReactNode
}) => {
  return (
    <>
      {children}
      {modals}
    </>
  )
}

export default FinesLayout
