import React from "react";

const PaginationCard = ({
  currentPage,
  jobsPerPage,
  totalJobs,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalJobs / jobsPerPage);


  const handlePageChange = (page) => {
    if(page > 0 && page <= totalPages){
        setCurrentPage(page)
    }
  }
  return (
    <div className="my-2">
      <ul className="flex justify-center space-x-2">
        <li>
          <button className="px-3 py-1 bg-gray-300 rounded"
          
          onClick={() => handlePageChange(currentPage -1)}
          >Previous</button>
        </li>

        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index}>
            <button
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => handlePageChange(index +1)}
            >
              {index + 1}
            </button>
          </li>
        ))}

        <li>
          <button className="px-3 py-1 bg-gray-300 rounded"
           onClick={() => handlePageChange(currentPage +1)}
          >Next</button>
        </li>
      </ul>
    </div>
  );
};

export default PaginationCard;
