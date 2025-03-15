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
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
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
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      toast.success(res?.data?.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.res?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center h-[82vh] py-20">
      <form
        onSubmit={submithandler}
        className="w-[400px] md:w-[450px] border border-gray-200 p-6 rounded-md bg-white shadow-lg"
      >
        <h1 className="text-xl font-semibold text-center mb-4">Sign Up</h1>

        <div>
          <Label>Full Name</Label>
          <Input
            type="text"
            name="fullName"
            value={input.fullName}
            placeholder="user-name"
            onChange={changeEventHandler}
          />
        </div>

        <div>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            placeholder="user@gmail.com"
            onChange={changeEventHandler}
          />
        </div>

        <div>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={input.password}
            placeholder="••••••"
            onChange={changeEventHandler}
          />
        </div>

        <div>
          <Label>Phone Number</Label>
          <Input
            type="text"
            name="phoneNumber"
            value={input.phoneNumber}
            placeholder="9867XXXXXX"
            onChange={changeEventHandler}
          />
        </div>

        <div className="mt-3">
          <Label>Role</Label>
          <RadioGroup className="flex gap-4">
            <div className="flex items-center gap-2">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
              />
              <Label>Student</Label>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
              />
              <Label>Recruiter</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="mt-3">
          <Label>Profile</Label>
          <Input type="file" accept="image/*" onChange={changeFileHandler} />
        </div>

        {loading ? (
          <Button className="w-full mt-4 bg-[#4331ec] flex items-center justify-center">
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            Loading...
          </Button>
        ) : (
          <Button className="w-full mt-4 bg-[#4331ec]">Signup</Button>
        )}

        <p className="text-center mt-3">
          Already have an account?
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
