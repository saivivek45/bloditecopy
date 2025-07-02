'use client'

import StartupForm from '@/components/custom/EditBlogForm'
import React from 'react'

interface Props {
  params: { id: string }
}

const page = ({ params }: Props) => {
  const { id } = params
  return (
    <>
      <StartupForm id={id} />
    </>
  )
}

export default page