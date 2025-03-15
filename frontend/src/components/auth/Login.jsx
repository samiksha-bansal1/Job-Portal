import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/auth/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Contant-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res?.data?.success) {
        dispatch(setUser(res?.data?.user));
        toast.success(res?.data?.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!", {
        style: { background: "#ffe6e6", color: "#cc0000" },
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div className="flex justify-center items-start  h-[82vh] py-20">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Login
        </h1>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <Label className="text-gray-600">Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              placeholder="user@gmail.com"
              onChange={changeEventHandler}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <Label className="text-gray-600">Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              placeholder="••••••"
              onChange={changeEventHandler}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center justify-center space-x-4">
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-gray-600">Student</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-gray-600">Recruiter</span>
            </label>
          </div>
          <Button className="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 flex justify-center items-center">
            {loading ? (
              <>
                <Loader2 className="mr-2 w-5 h-5 animate-spin" /> Loading...
              </>
            ) : (
              "Login"
            )}
          </Button>
          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-500">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
