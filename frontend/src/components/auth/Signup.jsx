import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/auth/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const {loading} = useSelector(state => state.auth);
  const dispatch  = useDispatch()
   const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    file: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submithandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      toast.success(res?.data?.message)
      navigate("/login")
    } catch (error) {
      console.log(error);
       toast.error(error.res?.data?.message)
    }finally{
      dispatch(setLoading(false))
    }
  };

  return (
    <div className="flex items-start justify-center w-full">
      <form
        onSubmit={submithandler}
        className="w-1/2 border border-gray-200 p-4 my-10 rounded-md bg-white"
      >
        <h1>Sign Up</h1>
        <div>
          <Label>Full Name</Label>
          <Input
            type="text"
            name="fullName"
            value={input.fullName}
            placeholder="rahul"
            onChange={changeEventHandler}
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            placeholder="rahul@gmail.com"
            onChange={changeEventHandler}
          />
        </div>
        <div>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={input.password}
            placeholder="12345"
            onChange={changeEventHandler}
          />
        </div>
        <div>
          <Label>Phone Number</Label>
          <Input
            type="text"
            name="phoneNumber"
            value={input.phoneNumber}
            placeholder="8080808080"
            onChange={changeEventHandler}
          />
        </div>

        <div className="flex items-center justify-between">
          <RadioGroup className="flex items-center justify-between my-5">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
              />
              <Label htmlFor="r1">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
              />
              <Label htmlFor="r2">Recruiter</Label>
            </div>
          </RadioGroup>
          <div className="flex items-center gap-2">
            <Label>Profile</Label>
            <Input type="file" accept="image/*" onChange={changeFileHandler} />
          </div>
        </div>
        {loading ? (
          <Button className="w-full my-2 bg-[#4331ec]">
            <Loader2 className="mr- w-4 h-4 animate-spin">
           
            </Loader2>
            Loading...
          </Button>
        ) : (
          <Button className="w-full my-2 bg-[#4331ec]">Signup</Button>
        )}

        <span>
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-500">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
