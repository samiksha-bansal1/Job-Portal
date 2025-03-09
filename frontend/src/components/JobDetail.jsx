import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setJob } from "@/redux/job/jobSlice";
import { toast } from "sonner";


const JobDetail = () => {
 
  const [jobStatus, setJobStatus] = useState(false);
  const {id} = useParams();

  const dispatch = useDispatch();
  const { job } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);


  useEffect(() => {
    if (job && user) {
      setJobStatus(
        job.applications.some(
          (application) => application.applicant === user._id || false
        )
      );
    }
  }, [job, user]);
  const fetchJob = async () => {
    try {
      console.log(id)
      const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
        withCredentials: true,
      });

      if (res?.data?.success) {
        dispatch(setJob(res?.data?.data));
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.res?.data?.message);
    }
  };

  useEffect(() => {
    

    fetchJob();
  }, [id,dispatch]);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${id}`, {
        withCredentials: true,
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        const updatedJob = {
          ...job,
          applications: [...job.applications, { applicant: user._id }],
        };
        dispatch(setJob(updatedJob));
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.res?.data?.message);
    }
  };

  return (
    <div className="bg-white rounded shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="border-b w-full py-2">
          <h1 className="text-2xl font-bold">{job?.title}</h1>
          <div className="flex gap-4 mt-4">
            <Badge variant="ghost" className="text-blue-700 font-bold">
              {job?.position} <span className="pl-1">Position</span>
            </Badge>
            <Badge variant="ghost" className="text-red-700 font-bold">
              <span className="pl-1">{job?.jobType}</span>
            </Badge>
            <Badge variant="ghost" className="text-[#00ADEF] font-bold">
              {job?.salary} <span className="pl-1">LPA</span>
            </Badge>
          </div>
        </div>
        <Button
          onClick={applyJobHandler}
          className={`rounded-lg px-4 py-2 text-white ${
            jobStatus
              ? "bg-gray-400  cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-800"
          }`}
        >
          {jobStatus ? "Already Aplied" : "Apply Now"}
        </Button>
      </div>

      <div className="space-y-2">
        <div>
          <span className="font-bold">Role:</span>{" "}
          <span className="text-gray-700 ml-2">{job?.title}</span>
        </div>
        <div>
          <span className="font-bold">Location:</span>{" "}
          <span className="text-gray-700 ml-2">{job?.location}</span>
        </div>
        <div>
          <span className="font-bold">Experience:</span>{" "}
          <span className="text-gray-700 ml-2">{job?.experience}</span>
        </div>
        <div>
          <span className="font-bold">Requirments:</span>{" "}
          {job?.requirements.map((requirement) => (
            <span className="text-gray-700 ml-2">{requirement}</span>
          ))}
        </div>
        <div>
          <span className="font-bold">Salary:</span>{" "}
          <span className="text-gray-700 ml-2">{job?.salary} LPA</span>
        </div>
        <div>
          <span className="font-bold">Total Applicants:</span>
          <span className="text-gray-700 ml-2">{job?.applications.length || 0}</span>
        </div>
        <div>
          <span className="font-bold">Post Date:</span>
          <span className="text-gray-700 ml-2">{job?.createdAt.split("T")[0]}</span>
        </div>
        <div>
          <span className="font-bold">Description</span>
          <span className="text-gray-700 ml-2">{job?.description}</span>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
