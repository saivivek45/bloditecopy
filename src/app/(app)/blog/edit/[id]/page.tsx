'use client'

import StartupForm from '@/components/custom/EditBlogForm'
import React, { use } from 'react'

interface Props {
  params: Promise<{ id: string }>
}

const page = ({ params }: Props) => {
  const { id } = use(params)
  return (
    <>
      <StartupForm id={id} />
    </>
  )
}

export default page