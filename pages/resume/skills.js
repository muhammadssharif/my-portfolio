import React from 'react'
import PrgLanguages from '@/components/PrgLanguages'
import Databases from '@/components/Databases'
import MainNav from '@/components/MainNav'
import Footer from '@/components/Footer'
import WebDev from '@/components/WebDev'
import CloudServices from '@/components/CloudServices'
export default function skills() {
  return (
    <>
      <MainNav />
      <PrgLanguages />
      <WebDev/>
      <Databases/>
      <CloudServices/>
      <Footer />
    </>
  )
}
