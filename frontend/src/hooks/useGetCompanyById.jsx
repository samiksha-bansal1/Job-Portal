import { setSingleCompany } from "@/redux/company/companySlice"
import { COMPANY_API_END_POINT } from "@/utils/constant"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"


const useGetCompanyById = (id) => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchCompany = async() => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${id}`, {withCredentials:true});
                if(res?.data?.success){
                  dispatch(setSingleCompany(res?.data?.data));
                }
            } catch (error) {
               console.log(error) 
            }
        }
        fetchCompany();
    },[id, dispatch])
}

export default useGetCompanyById