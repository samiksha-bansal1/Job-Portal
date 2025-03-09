import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-[#DEE4E8] p-5'>
        <div className='max-w-7xl mx-auto p-6'>
           <div className='flex items-center justify-between md:items-start'>
            <h1 className='font-semibold text-xl'>Tech Hire</h1>
            <p className='text-sm mt-2'>
            © {new Date().getFullYear()} Tech  Hire. All rights reserved. Since 2025.
            </p>
           </div>
        </div>
    </footer>
  )
}

export default Footer