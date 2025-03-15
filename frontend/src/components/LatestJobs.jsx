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
    <div className="max-w-7xl mx-auto my-10 px-6 sm:px-10">
      <h1 className="font-bold text-3xl text-gray-800 mb-6">Latest Jobs</h1>
      <p className="text-lg text-gray-600 mb-10">
        Get your desired job from top companies
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentJobs.length > 0 ? (
          currentJobs.map((job, index) => <JobCard key={index} job={job} />)
        ) : (
          <div className="col-span-full text-center py-12 bg-gray-100 rounded-lg">
            <span className="text-lg font-semibold text-gray-700">
              No Jobs Available
            </span>
          </div>
        )}
      </div>

      {allJobs.length > jobsPerPage && (
        <PaginationCard
          currentPage={currentPage}
          jobsPerPage={jobsPerPage}
          totalJobs={allJobs.length}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default LatestJobs;
