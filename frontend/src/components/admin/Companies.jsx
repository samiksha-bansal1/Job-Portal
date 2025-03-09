import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompanyTable from './CompanyTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchCompany } from '@/redux/company/companySlice'
import useGetCompanies from '@/hooks/useGetCompanies'

const Companies = () => {
  useGetCompanies();
  const [input,setInput] = useState("")
  const navigate = useNavigate();
   const dispatch = useDispatch();
  useEffect(() => {
   dispatch(setSearchCompany(input))
  },[input])
  return (
    <div className='m-10'>
      <div className='flex items-center gap-2 my-2'>
         <Input type="text" placeholder="Filter By Name" onChange={(e) => setInput(e.target.value)} />
         <Button onClick={() => navigate("/admin/create/company")}>New Company</Button>
      </div>

      <CompanyTable />
    </div>
  )
}

export default Companies