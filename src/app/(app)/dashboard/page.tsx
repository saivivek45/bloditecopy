import { Metadata } from 'next'
import React from 'react'
import Page from './main'

export const metadata: Metadata = {
  title: "Dashboard"
}

const Dashboard = () => {
  return (
    <>
      <Page/>
    </>
  )
}

export default Dashboard