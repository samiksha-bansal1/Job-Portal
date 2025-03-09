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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import useGetCompanies from "@/hooks/useGetCompanies";
import { useNavigate } from "react-router-dom";

const CompanyTable = () => {
  useGetCompanies();
  const { allCompanies = [], searchCompany ="" } = useSelector((state) => state.company);
  const navigate = useNavigate();
  const [filterComapany, setFilterComapny] = useState(allCompanies)
  useEffect(() => {
    const filteredComapany = allCompanies?.filter((company) => company?.name?.toLowerCase().includes(searchCompany.toLowerCase())) ||  [];
    setFilterComapny(filteredComapany)
  },[searchCompany, allCompanies])
  return (
    <div>
      <Table>
        <TableCaption>A List of your recent regitered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterComapany.length > 0 ? (
            filterComapany.map((company) => (
              <TableRow key={company?._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company?.logo} />
                  </Avatar>
                </TableCell>
                <TableCell>{company?.name}</TableCell>
                <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 cursor-pointer">
                      <div
                        className="flex items-center gap-2 w-fit"
                        onClick={() => navigate(`/admin/company/${company?._id}`)}
                      >
                        <Edit className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No Companies Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompanyTable;
