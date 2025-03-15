import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "@/redux/job/jobSlice";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = () => {
    if (query.trim()) {
      dispatch(setSearchQuery(query));
      navigate("/search-result");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-[#DEE4E8]  h-[50vh]">
      <h1 className="font-extrabold text-4xl text-[#4331ec] pb-6 text-center">
        Find Your Dream Job or Perfect Candidate
      </h1>
      <p className="text-xl text-gray-700 text-center max-w-lg mb-8">
        Connect with thousands of employers and job seekers on our platform to
        land the perfect opportunity or candidate.
      </p>
      <div className="flex items-center gap-4 w-full sm:w-4/5 md:w-2/3 lg:w-1/2 my-8">
        <Input
          className="outline-none border rounded-l-md p-4 w-full text-gray-700 shadow-lg focus:ring-2 focus:ring-[#4331ec] transition duration-200"
          type="text"
          placeholder="Find your dream job"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          className="bg-[#4331ec] text-white p-4 rounded-r-md hover:bg-[#3a2db3] transition duration-200 ease-in-out"
          onClick={searchHandler}
        >
          <Search size={20} />
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
