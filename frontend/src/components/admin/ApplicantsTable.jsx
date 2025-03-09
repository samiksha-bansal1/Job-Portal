import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const statusArray = ["accepted", "rejected"]

const ApplicantsTable = () => {
 const {applicants =[]} = useSelector(state => state.application)
const statusHandler =async (status, id) => {
  try {
    const res = await axios.put(`${APPLICATION_API_END_POINT}/status/update/${id}`,{status}, {withCredentials:true});
   if(res?.data?.success){
    toast.success(res?.data?.message)
   }
  } catch (error) {
    console.log(error);
    toast.error(error?.res?.data?.message)
  }
}
  return (
    <div>
      <Table>
        <TableCaption>A List of applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants.length > 0 ? (
            applicants.map((applicant) => (
              <TableRow key={applicant?._id}>
                <TableCell>{applicant?.applicant?.fullName}</TableCell>
                <TableCell>{applicant?.applicant?.email}</TableCell>
                <TableCell>{applicant?.applicant?.phoneNumber}</TableCell>
                <TableCell>{
                  applicant?.applicant?.profile?.resume ? (
                   <a href={applicant?.applicant?.profile?.resume} target="_blank" className="text-blue-600 cursor-pointer">
                    {
                      applicant?.applicant?.profile?.resumeName
                    }
                   </a>
                  ) :(<span></span>)
                  }</TableCell>
                <TableCell>{applicant?.applicant?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 cursor-pointer">
                     {
                      statusArray.map((status,index) => (
                        <div key={index} className="flex items-center w-fit my-2 cursor-pointer"
                        onClick={() => statusHandler(status, applicant?._id)}
                        >
                          <span>{status}</span>
                        </div>
                      ))
                     }
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No Applicants
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
