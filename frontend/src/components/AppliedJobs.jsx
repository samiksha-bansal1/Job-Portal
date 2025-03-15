import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { useSelector } from "react-redux";

const AppliedJobs = () => {
  useGetAppliedJobs();
  const { allAppliedJobs = [] } = useSelector((state) => state.job);

  return (
    <div className="flex justify-center w-full mt-6">
      <div className="w-11/12 md:w-4/5 lg:w-3/5 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Applied Jobs
        </h2>
        <Table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <TableCaption className="text-gray-600 mt-2">
            A list of your applied jobs
          </TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="p-3 text-gray-700 font-semibold">
                Date
              </TableHead>
              <TableHead className="p-3 text-gray-700 font-semibold">
                Job Role
              </TableHead>
              <TableHead className="p-3 text-gray-700 font-semibold">
                Company
              </TableHead>
              <TableHead className="p-3 text-right text-gray-700 font-semibold">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAppliedJobs.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  🚀 You haven't applied to any job yet!
                </td>
              </tr>
            ) : (
              allAppliedJobs.map((job, index) => (
                <TableRow
                  key={job._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition`}
                >
                  <TableCell className="p-3 text-gray-600">
                    {job?.createdAt.split("T")[0]}
                  </TableCell>
                  <TableCell className="p-3 font-medium text-gray-800">
                    {job?.job?.title}
                  </TableCell>
                  <TableCell className="p-3 text-gray-700">
                    {job?.job?.company?.name}
                  </TableCell>
                  <TableCell className="p-3 text-right">
                    <Badge
                      className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                        job?.status === "rejected"
                          ? "bg-red-100 text-red-600 border border-red-400"
                          : job?.status === "pending"
                          ? "bg-yellow-100 text-yellow-600 border border-yellow-400"
                          : "bg-green-100 text-green-600 border border-green-400"
                      }`}
                    >
                      {job?.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppliedJobs;
