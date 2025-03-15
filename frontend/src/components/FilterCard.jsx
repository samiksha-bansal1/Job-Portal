import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/job/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Pune", "Delhi", "Bengaluru", "Hyderabad"],
  },
  {
    filterType: "Role",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["6-10 LPA", "11-16 LPA", "17-30 LPA"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg my-5 max-w-md mx-auto md:max-w-xl">
      <h1 className="font-bold text-2xl text-gray-700 mb-4">Filter Jobs</h1>
      <hr className="my-4 border-t border-gray-300" />

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => {
          return (
            <div key={index} className="mb-4">
              <h2 className="font-semibold text-lg text-gray-800">
                {data.filterType}
              </h2>
              <div className="space-y-2 mt-2">
                {data.array.map((item, key) => {
                  const itemId = `${index}-${key}`;
                  return (
                    <div className="flex items-center space-x-2" key={key}>
                      <RadioGroupItem
                        value={item}
                        id={itemId}
                        className="text-blue-600 hover:text-blue-800 transition duration-300"
                      />
                      <Label htmlFor={itemId} className="text-gray-600 text-sm">
                        {item}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
