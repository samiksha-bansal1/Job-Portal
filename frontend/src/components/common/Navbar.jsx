import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, User2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setLoading, setUser } from "@/redux/auth/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
const dispatch = useDispatch();
const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      dispatch(setLoading(true))
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
     
      if(res?.data?.success){
        toast.success(res?.data?.message)
        dispatch(setUser(null));
        navigate("/")
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.res?.data?.message);
    }finally{
      dispatch(setLoading(false))
    }
  };
  return (
    <header className="flex items-center justify-between px-8 py-4 shadow-md text-2xl bg-[#DEE4E8] font-serif">
      <div>
        <Link to={"/"}>
          <h1 className="font-bold text-[#4331ec]">Tech Hire</h1>
        </Link>
      </div>
      <div>
        <ul className="flex items-center gap-10">
          {!user || user?.role === "student" ? (
            <>
              <li>
                <Link to={"/findjobs"} className="hover:text-red-500">
                  Find Jobs
                </Link>
              </li>

              <li>
                <Link to={"/myjobs"} className="hover:text-red-500">
                  My Jobs
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={"/admin/jobs"} className="hover:text-red-500">
                  Jobs
                </Link>
              </li>

              <li>
                <Link to={"/admin"} className="hover:text-red-500">
                  Companies
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {!user ? (
        <div>
          <Link to={"/login"}>
            <Button className="bg-[#4331ec] hover:bg-[#3124a7]">Login</Button>
          </Link>
        </div>
      ) : (
        <div>
          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage src={user?.profile?.profilePhoto} />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="flex gap-4 space-y-2">
                <Avatar>
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
                <div>
                  <h1>{user?.fullName}</h1>
                  <p className="text-sm text-muted-foreground">
                    {user?.profile?.bio}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start justify-center">
                { user?.role === "student" && (
                  <div className="flex items-center">
                    <User2 />
                    <Link to={"/profile"}>
                      <Button variant="link">View Profile</Button>
                    </Link>
                  </div>
                )}

                <div className="flex items-center">
                  <LogOut />
                  <Button variant="link" onClick={logoutHandler}>
                    Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </header>
  );
};

export default Navbar;
