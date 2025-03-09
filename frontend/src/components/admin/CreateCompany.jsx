import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";

const CreateCompany = () => {
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();
  const registerCompany = async (e) => {
    try {
      const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
        headers:{
            "Content-Type" :"application/json"
        },
        withCredentials:true
      });

      if(res?.data?.success){
       toast.success(res?.data?.message);
       navigate("/admin")
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.res?.data?.message);
    }
  };
  return (
    <div className="max-w-4xl mx-auto">
      <div className="my-10">
        <h1>Your Company Name</h1>
        <p>
         
          what you like to give your company name? you can change this later
        </p>
      </div>
      <Label>Company Name</Label>
      <Input
        type="text"
        className="my-2"
        placeholder="Google"
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <div className="flex items-center gap-2 my-10">
        <Button variant="outline" onClick={() => navigate("/admin")}>Cencel</Button>
        <Button onClick={registerCompany}>Continue</Button>
      </div>
    </div>
  );
};

export default CreateCompany;
