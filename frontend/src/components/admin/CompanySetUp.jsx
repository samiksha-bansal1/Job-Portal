import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { useSelector } from "react-redux";

const CompanySetUp = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  useGetCompanyById(id);
  const {singleCompany} = useSelector(state => state.company)
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.res?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name:singleCompany.name || "",
      description:singleCompany.description || "",
      website:singleCompany.website || "",
      location:singleCompany.location || "",
      file:singleCompany.file || null,

    })
  },[singleCompany])

  return (
    <div className="max-w-xl my-10 mx-auto">
        <div className="flex items-center gap-4 p-8">
          <Button onClick={() => navigate("/admin")}>
            <ArrowLeft />
            <span>Back</span>
          </Button>

          <h1>Company SetUp</h1>
        </div>
      <form onSubmit={submitHandler} className="bg-white p-5">
      
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Company Name</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Website</Label>
            <Input
              type="text"
              name="website"
              value={input.website}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Logo</Label>
            <Input
              type="file"
              accept="image/*"
              name="file"
              onChange={changeFileHandler}
            />
          </div>
        </div>
        {loading ? (
                 <Button className="w-full my-2 bg-[#4331ec]">
                   <Loader2 className="mr- w-4 h-4 animate-spin">
                  
                   </Loader2>
                   Loading...
                 </Button>
               ) : (
                 <Button className="w-full my-2 bg-[#4331ec]">Update</Button>
               )}
      </form>
    </div>
  );
};

export default CompanySetUp;
