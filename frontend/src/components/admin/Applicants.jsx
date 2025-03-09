import { setApplicants } from '@/redux/application/applicationSlice';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useParams } from 'react-router-dom';
import { toast } from 'sonner';
import ApplicantsTable from './ApplicantsTable';

const Applicants = () => {
    const dispatch = useDispatch();
 const {applicants = []} = useSelector(state => state.application)
    const {id} = useParams();
 
    useEffect(() =>{
        const fetchAplicants = async() => {
            try {
                const res  = await axios.get(`${APPLICATION_API_END_POINT}/applicants/${id}`,{withCredentials:true})
         
                if(res?.data?.success){
                    toast.success(res?.data?.message);
                    dispatch(setApplicants(res?.data?.data))
                }
            } catch (error) {
                console.log(error);
                toast.error(error.res?.data?.message)
            }
        }

        fetchAplicants();
    },[])
  return (
    <div className='max-w-7xl mx-auto'>
        <h1 className='text-xl my-4'>Applicants ({applicants.length})</h1>
        <ApplicantsTable />
    </div>
  )
}

export default Applicants