import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const PostJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { allCompanies =  []} = useSelector((state) => state.company);
//   console.log(allCompanies)
  const [input, setInput] = useState({
    title: "",
    description: "",
    salary: 0,
    requirements: "",
    position: 0,
    jobType: "",
    experience: "",
    location: "",
    companyId: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectValueHandler = (value) => {
    const selectedCompany = allCompanies.find(
      (company) => company?.name?.toLowerCase() === value
    );
   console.log(selectedCompany);
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.res?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center my-5 w-screen">
      <form
        onSubmit={submitHandler}
        className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
      >
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.title}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.description}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Salary</Label>
            <Input
              type="text"
              name="salary"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.salary}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Requirments</Label>
            <Input
              type="text"
              name="requirements"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.requirements}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Position</Label>
            <Input
              type="text"
              name="position"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.position}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Job Type</Label>
            <Input
              type="text"
              name="jobType"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.jobType}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Experience</Label>
            <Input
              type="text"
              name="experience"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.experience}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.location}
              onChange={changeEventHandler}
            />
          </div>
        </div>

        {allCompanies.length > 0 && (
          <Select onValueChange={selectValueHandler}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {allCompanies.map((company) => (
                  <SelectItem key={company._id} value={company?.name.toLowerCase()}>{company.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        {loading ? (
          <Button className="w-full my-2 bg-[#4331ec]">
            <Loader2 className="mr- w-4 h-4 animate-spin"></Loader2>
            Loading...
          </Button>
        ) : (
          <Button className="w-full my-2 bg-[#4331ec]">Post Job</Button>
        )}
      </form>
    </div>
  );
};

export default PostJob;
