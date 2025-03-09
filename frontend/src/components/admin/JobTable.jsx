import React, { useEffect, useState } from "react";
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
import { Edit, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const JobTable = () => {

  const { adminJobs = [], searchJobs ="" } = useSelector((state) => state.job);
  const navigate = useNavigate();
  const [filterJob, setFilterJob] = useState(adminJobs)
  useEffect(() => {
    const filteredJob = adminJobs?.filter((job) => job?.title?.toLowerCase().includes(searchJobs.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobs.toLowerCase())) || [];
    setFilterJob(filteredJob)
  },[adminJobs, searchJobs])


  return (
    <div>
      <Table>
        <TableCaption>A List of your recent post jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJob.length > 0 ? (
            filterJob.map((job) => (
              <TableRow key={job?._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 cursor-pointer">
                      <div
                        className="flex items-center gap-2 w-fit"
                        onClick={() => navigate(`/admin/job/applicants/${job?._id}`)}
                      >
                       <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No Jobs Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobTable;
