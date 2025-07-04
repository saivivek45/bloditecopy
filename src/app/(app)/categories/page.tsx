import Category from '@/components/custom/Category'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "Category"
}

const page = () => {
  return (
    <>
      <Category/>
    </>
  )
}

export default page