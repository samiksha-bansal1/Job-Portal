import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchQuery } from '@/redux/job/jobSlice'

const HeroSection = () => {
  
  const [query,setQuery] = useState("");
const dispatch = useDispatch();
const navigate = useNavigate();

  const searchHandler =() => {
   dispatch(setSearchQuery(query));
   navigate("/search-result")
  }
  return (
    <div className='flex flex-col items-center justify-center py-10  bg-[#DEE4E8]'>
        <h1 className='font-bold text-4xl text-[#4331ec] pb-6'>Find You Dream Job or Perfect Candidate</h1>
        <p className='text-2xl'>Connect with thousands of employers and Job Seekres on our platform</p>
        <div className='flex items-center gap-2 w-[50%] my-8'>
            <Input className="outline-none border-none w-full p-2" type="text" placeholder="FInd you dream job" onChange={(e) => setQuery(e.target.value)} />
            <Button className="bg-[#4331ec]" onClick={searchHandler}><Search /></Button>
        </div>
    </div>
  )
}

export default HeroSection