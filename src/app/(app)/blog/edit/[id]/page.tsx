'use client'

import StartupForm from '@/components/custom/EditBlogForm'
import { useParams } from 'next/navigation'
import React, { use } from 'react'

interface Props {
  params: Promise<{ id: string }>
}

const page = () => {
  const param = useParams<{ id: string }>();
  const id: string = param.id;
  
  return (
    <>
      <StartupForm id={id} />
    </>
  )
}

export default page