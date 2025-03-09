import FilterCard from "@/components/FilterCard";
import JobCard from "@/components/JobCard";
import PaginationCard from "@/components/PaginationCard";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FindJobs = () => {
  useGetAllJobs();
  const { allJobs, searchQuery } = useSelector((state) => state.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  useEffect(() => {
    if (searchQuery) {
      const filteredJobs = allJobs.filter((job) => {
        if (searchQuery.includes("-")) {
          const [min, max] = searchQuery.split("-").map(Number);
          return job.salary >= min && job.salary <= max;
        }
        return (
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });

      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchQuery]);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = filterJobs.slice(startIndex, startIndex + jobsPerPage);

  return (
  <div>
      <div className="flex max-w-7xl my-10 p-4  gap-4">
      <div className="w-1/4">
        <FilterCard />
      </div>
      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
          {currentJobs.length !== 0 ? (
            currentJobs.map((job, index) => <JobCard key={index} job={job} />)
          ) : (
            <span>No jobs Available</span>
          )}
        </div>
      </div>

    </div>
    {
  filterJobs.length !== 0 && (
    <PaginationCard
  currentPage={currentPage}
  jobsPerPage={jobsPerPage}
  totalJobs={filterJobs.length}
  setCurrentPage={setCurrentPage}
/>
  )
}
  </div>


  );
};

export default FindJobs;
