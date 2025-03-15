import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, User2, Menu } from "lucide-react";
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
      dispatch(setLoading(true));
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        dispatch(setUser(null));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Logout failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <header className="flex items-center justify-between px-6 md:px-12 py-4 shadow-md bg-gray-100 text-lg">
      <Link to={"/"} className="text-2xl font-bold text-indigo-600">
        Tech Hire
      </Link>

      <nav className="hidden md:flex items-center gap-8 text-gray-700">
        {!user || user?.role === "student" ? (
          <>
            <Link to={"/findjobs"} className="hover:text-indigo-500 transition">
              Find Jobs
            </Link>
            <Link to={"/myjobs"} className="hover:text-indigo-500 transition">
              My Jobs
            </Link>
          </>
        ) : (
          <>
            <Link
              to={"/admin/jobs"}
              className="hover:text-indigo-500 transition"
            >
              Jobs
            </Link>
            <Link to={"/admin"} className="hover:text-indigo-500 transition">
              Companies
            </Link>
          </>
        )}
      </nav>

      <div className="md:hidden">
        <Popover>
          <PopoverTrigger>
            <Menu className="w-7 h-7 text-gray-700" />
          </PopoverTrigger>
          <PopoverContent className="w-40 p-2 flex flex-col gap-2 bg-white rounded-md shadow-lg">
            {!user || user?.role === "student" ? (
              <>
                <Link
                  to={"/findjobs"}
                  className="hover:text-indigo-500 transition"
                >
                  Find Jobs
                </Link>
                <Link
                  to={"/myjobs"}
                  className="hover:text-indigo-500 transition"
                >
                  My Jobs
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={"/admin/jobs"}
                  className="hover:text-indigo-500 transition"
                >
                  Jobs
                </Link>
                <Link
                  to={"/admin"}
                  className="hover:text-indigo-500 transition"
                >
                  Companies
                </Link>
              </>
            )}
          </PopoverContent>
        </Popover>
      </div>

      {!user ? (
        <Link to={"/login"}>
          <Button className="bg-indigo-600 hover:bg-indigo-700">Login</Button>
        </Link>
      ) : (
        <Popover>
          <PopoverTrigger>
            <Avatar className="w-10 h-10 border">
              <AvatarImage
                src={user?.profile?.profilePhoto || "public/useravatar.png"}
                alt="User Avatar"
              />
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4">
            <div className="flex gap-4 items-center border-b pb-3">
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={user?.profile?.profilePhoto || "public/useravatar.png"}
                  alt="User Avatar"
                />
              </Avatar>
              <div>
                <h1 className="text-lg font-semibold">{user?.fullName}</h1>
                <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-3">
              {user?.role === "student" && (
                <Link
                  to={"/profile"}
                  className="flex items-center gap-2 text-gray-700 hover:text-indigo-500 transition"
                >
                  <User2 className="w-5 h-5" />
                  <span>View Profile</span>
                </Link>
              )}

              <button
                onClick={logoutHandler}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 transition"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </header>
  );
};

export default Navbar;
