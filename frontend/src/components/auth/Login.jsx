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
      toast.error(error.res?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div className="flex items-start justify-center w-full">
      <form
        onSubmit={submitHandler}
        className="w-1/2 border border-gray-200 p-4 my-10 rounded-md bg-white"
      >
        <h1>Login</h1>

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
        </div>
        {loading ? (
          <Button className="w-full my-2 bg-[#4331ec]">
            <Loader2 className="mr- w-4 h-4 animate-spin">
           
            </Loader2>
            Loading...
          </Button>
        ) : (
          <Button className="w-full my-2 bg-[#4331ec]">Login</Button>
        )}

        <span>
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-blue-500">
            Sign Up
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
