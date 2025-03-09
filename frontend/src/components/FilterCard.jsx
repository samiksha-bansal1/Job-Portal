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
    array: ["Frontend Developer", "Backend Developer", "FullStack Develope"],
  },
  {
    filterType: "Salary",
    array: ["6-10", "11-16", "17-30"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value)
  }

  useEffect(() => {
    dispatch(setSearchQuery(selectedValue))
  },[selectedValue])
  return (
    <div className="bg-white p-4 rounded-md shadow-md my-5">
      <h1 className="font-bold text-xl">Filter job</h1>
      <hr className="my-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => {
          return (
            <div key={index}>
              <h1 className="font-bold text-lg">{data.filterType}</h1>
              {data.array.map((item, key) => {
                const itemId = `${index} - ${key}`
                return (
                  <div className="flex items-center my-2 space-x-2" key={key}>
                    <RadioGroupItem  value={item} id={itemId}/>
                    <Label htmlFor={itemId}>{item}</Label>
                  </div>
                );
              })}
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
