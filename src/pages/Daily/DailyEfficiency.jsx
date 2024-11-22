import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import EmployeeIncentivePage from "./EmployeeIncentivePage";

const DailyEfficiency = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [empSSN, setEmpSSN] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [averageEfficiency, setAverageEfficiency] = useState(null);
  const [incentives, setIncentives] = useState([]);
  const [includeBaseIncentive, setIncludeBaseIncentive] = useState(false);

  const fetchDailyEntries = async () => {
    const response = await axios.get(`${import.meta.env.VITE_APP_URL}/webapp/api/per/`);
    return response.data;
  };

  const fetchEmployees = async () => {
    const response = await axios.get(`${import.meta.env.VITE_APP_URL}/webapp/api/employees/`);
    return response.data;
  };

  const { data: dailyentry } = useQuery({
    queryKey: ["dailyentry"], 
     queryFn : fetchDailyEntries,
     refetchOnWindowFocus: false,
     cacheTime: 30000,
     staleTime: 60000,
  },
);

  const { data: employeeSSNS } = useQuery({
    
  queryKey : ["dailyemployees"], 
  queryFn : fetchEmployees, 
    onError: () => console.error("Error fetching employee SSNs"),
    cacheTime: 30000,
     staleTime: 60000,
     refetchOnWindowFocus: false
});

  const calculateIncentives = async () => {
    if (startDate && endDate && employeeSSNS?.length) {
      try {
        const promises = employeeSSNS.map(emp =>
          axios.get(`${import.meta.env.VITE_APP_URL}/webapp/calculate-incentive/${emp.emp_ssn}/${startDate}/${endDate}/`)
        );
        const responses = await Promise.all(promises);
        setIncentives(responses.map(res => res.data));
      } catch (error) {
        console.error("Error calculating incentives:", error);
      }
    }
  };

  const filterData = () => {
    if (!startDate || !endDate || !dailyentry?.length) return [];
    return dailyentry.filter(
      (item) =>
        item.emp_ssn === empSSN.label &&
        new Date(item.date) >= new Date(startDate) &&
        new Date(item.date) <= new Date(endDate)
    );
  };

  const calculateAverageEfficiency = (data) => {
    if (!data.length) return null;
    const totalEfficiencySum = data.reduce((sum, entry) => {
      const x = entry.target * (entry.partial_shift / entry.shift_duration);
      const efficiency = (entry.achieved / x) * 100;
      return sum + efficiency;
    }, 0);
    return totalEfficiencySum / data.length;
  };

  useEffect(() => {
    const filtered = filterData();
    setFilteredData(filtered);
    setAverageEfficiency(calculateAverageEfficiency(filtered));
  }, [empSSN, startDate, endDate, dailyentry]);

  useEffect(() => {
    calculateIncentives();
  }, [startDate, endDate, employeeSSNS]);

  const showSubmitButton = () => {
    return (!averageEfficiency || !incentives.length) && (empSSN || startDate || endDate);
  };

  return (
    <div className="w-full h-full flex flex-col gap-y-3 justify-center items-center">
      <div className="m-2 flex flex-col justify-center items-center h-full pt-2 md:m-10 mt-24 md:p-10 bg-white rounded-3xl w-[550px]">
        <div className="bg-white flex flex-col gap-y-4">
          <div>
            <label htmlFor="startDate" className="block text-lg font-medium text-gray-700">
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate || ""}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-[480px] border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-lg font-medium text-gray-700">
              End Date:
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate || ""}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-[480px] border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={includeBaseIncentive}
              onChange={() => setIncludeBaseIncentive(!includeBaseIncentive)}
              className="mr-2"
            />
            <label htmlFor="baseIncentive" className="text-sm text-gray-700 dark:text-gray-300">
              Include base incentive
            </label>
          </div>
          {showSubmitButton() && (
            <button
              type="button"
              onClick={() => calculateIncentives()}
              className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700"
            >
              Submit
            </button>
          )}
          {averageEfficiency !== null && (
            <p className="text-[20px]">
              <b>Efficiency</b>: {isNaN(averageEfficiency) ? "0" : averageEfficiency.toFixed(2)}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {incentives.map((data, index) => (
          <EmployeeIncentivePage
            key={index}
            data={data}
            employee={employeeSSNS[index]}
            includeBaseIncentive={includeBaseIncentive}
            setIncludeBaseIncentive={setIncludeBaseIncentive}
          />
        ))}
      </div>
    </div>
  );
};

export default DailyEfficiency;
