import StartupForm from '@/components/custom/StartForm'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "Blog Creation"
}

const page = () => {

  return (
    <>
      <StartupForm />
    </>
  )
}

export default page