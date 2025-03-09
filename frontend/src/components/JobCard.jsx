import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const JobCard = ({job}) => {

 const navigate  = useNavigate()

 const dateFunction = (date) => {
    const createdAt = new Date(date);
    const currentTime = new Date();
    const timeDifference  = currentTime - createdAt;

    return Math.floor(timeDifference /( 24 * 60 * 60 * 1000))
 }
  return (
    <div className="bg-white p-4 rounded-md shadow-xl">
      <div className="flex  items-center justify-between">
        <p className="text-sm text-gray-600">

          {
            dateFunction(job?.createdAt) === 0 ? "Today" : `${dateFunction(job?.createdAt)} days ago`
          }
        </p>
        <Button variant="outline">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-4 my-4">
        <Avatar className="w-16 h-16">
          <AvatarImage
            src={job?.company?.logo}
            alt="company logo"
          />
        </Avatar>
        <span className="text-xl font-semibold">{job?.company?.name}</span>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">
         {job?.description}
        </p>
      </div>
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
      <div className="w-full mt-4">
        <Button variant="outline" className="w-full" onClick={() => navigate(`/jobdetail/${job?._id}`)}>
          Details
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
