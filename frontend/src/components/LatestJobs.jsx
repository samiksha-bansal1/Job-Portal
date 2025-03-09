import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import PaginationCard from "./PaginationCard";

const LatestJobs = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((state) => state.job);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = allJobs.slice(startIndex, startIndex + jobsPerPage);
  return (
    <div className="max-w-7xl mx-auto my-10 px-10">
      <h1 className="font-bold text-2xl mb-8">Latest Jobs</h1>
      <p>Get your desired job from top companies</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
        {currentJobs.length !== 0 ? (
          currentJobs.map((job, index) => <JobCard key={index} job={job} />)
        ) : (
          <span>NO Jobs Available</span>
        )}
      </div>
      <PaginationCard
        currentPage={currentPage}
        jobsPerPage={jobsPerPage}
        totalJobs={allJobs.length}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default LatestJobs;
