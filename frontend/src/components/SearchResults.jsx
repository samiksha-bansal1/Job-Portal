import React, { useEffect } from 'react'
import JobCard from './JobCard'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '@/redux/job/jobSlice'

const SearchResults = () => {
  useGetAllJobs();
  const {allJobs} = useSelector(state => state.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      return dispatch(setSearchQuery(""))
    }
  },[])

  return (
    <div className='max-w-7xl mx-auto my-10 px-10'>
        <h1 className='text-2xl font-semibold mb-8'>Search Results ({allJobs.length})</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-5'>
           {
            allJobs.map((job,index) =>  <JobCard key={index} job={job} />)
           }
        </div>
    </div>
  )
}

export default SearchResults