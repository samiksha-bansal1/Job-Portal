import { setAllJobs } from "@/redux/job/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
    const {searchQuery} = useSelector(state => state.job)
   const dispatch = useDispatch();
    useEffect(() => {
       const fetchAllJobs = async() => {
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchQuery}`, {withCredentials:true});
    
            if(res?.data?.success){
              dispatch(setAllJobs(res?.data?.data))
            }
        } catch (error) {
            console.log(error)
        }
       }

       fetchAllJobs();
    },[])
}

export default useGetAllJobs;