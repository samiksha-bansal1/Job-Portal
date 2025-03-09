import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet   />
      <Footer />
   
    </>
  )
}

export default AdminLayout