import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const dateFunction = (date) => {
    const createdAt = new Date(date);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;

    return Math.floor(timeDifference / (24 * 60 * 60 * 1000));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {dateFunction(job?.createdAt) === 0
            ? "Today"
            : `${dateFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <Bookmark className="text-gray-500 hover:text-blue-600" />
        </Button>
      </div>

      <div className="flex items-center gap-4 my-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={job?.company?.logo} alt="company logo" />
        </Avatar>
        <span className="text-xl font-semibold text-gray-700">
          {job?.company?.name}
        </span>
      </div>

      <div className="mb-4">
        <h1 className="font-semibold text-xl text-gray-800 my-2">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>

      <div className="flex gap-4 mt-4 flex-wrap">
        <Badge variant="outline" className="text-blue-600 font-medium">
          {job?.position} <span className="pl-1">Position</span>
        </Badge>
        <Badge variant="outline" className="text-red-600 font-medium">
          <span className="pl-1">{job?.jobType}</span>
        </Badge>
        <Badge variant="outline" className="text-[#00ADEF] font-medium">
          {job?.salary} <span className="pl-1">LPA</span>
        </Badge>
      </div>

      <div className="w-full mt-6">
        <Button
          variant="primary"
          className="w-full py-2 text-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:text-white"
          onClick={() => navigate(`/jobdetail/${job?._id}`)}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
