import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchJobs } from '@/redux/job/jobSlice'
import JobTable from './JobTable'
import useGetAdminJobs from '@/hooks/useGetAdminJobs'

const AdminJobs = () => {
  useGetAdminJobs();
  const [input,setInput] = useState("");
  const navigate = useNavigate();
   const dispatch = useDispatch();
  useEffect(() => {
   dispatch(setSearchJobs(input))
  },[input])
  return (
    <div className='m-10'>
      <div className='flex items-center gap-2 my-2'>
         <Input type="text" placeholder="Filter By Name" onChange={(e) => setInput(e.target.value)} />
         <Button onClick={() => navigate("/admin/create/job")}>Post New Job</Button>
      </div>

      <JobTable />
    </div>
  )
}

export default AdminJobs