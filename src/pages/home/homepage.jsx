import React, { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BsPersonWorkspace } from 'react-icons/bs';
import { FaTools } from 'react-icons/fa';
import { GrVirtualMachine } from 'react-icons/gr';
import { ImFileOpenoffice } from 'react-icons/im';

// Lazy loading charts
const LeftChart = React.lazy(() => import('../../Charts/leftLinechart/leftlinechart.jsx'));
const BigChart = React.lazy(() => import('../../Charts/BigChart/BigChart.jsx'));

const fetchTotalEmployees = async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_URL}/webapp/num_employees/`);
  return response.data.num_employees;
};

const fetchTotalMachines = async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_URL}/webapp/num_machines`);
  return response.data.num_machines;
};

const fetchTotalTools = async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_URL}/webapp/num_tools`);
  return response.data.num_tools;
};

const fetchTotalJobs = async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_URL}/webapp/num_jobs`);
  return response.data.num_jobs;
};

const Homepage = () => {
  const { data: totalEmployees, isLoading: isLoadingEmployees } = useQuery({
    queryKey: ['totalEmployees'],
    queryFn: fetchTotalEmployees,
    refetchOnWindowFocus: false
  });

  const { data: totalMachines, isLoading: isLoadingMachines } = useQuery({
    queryKey: ['totalMachines'],
    queryFn: fetchTotalMachines,
    refetchOnWindowFocus: false
  });

  const { data: totalTools, isLoading: isLoadingTools } = useQuery({
    queryKey: ['totalTools'],
    queryFn: fetchTotalTools,
    refetchOnWindowFocus: false
  });

  const { data: totalJobs, isLoading: isLoadingJobs } = useQuery({
    queryKey: ['totalJobs'],
    queryFn: fetchTotalJobs,
    refetchOnWindowFocus: false
  });

  const isLoading = isLoadingEmployees || isLoadingMachines || isLoadingTools || isLoadingJobs;

  return (
    <div className="bg-main-dark-bg m-10 flex flex-col gap-y-8 mt-12">
      {isLoading ? (
        <p className="text-white text-center">Loading...</p>
      ) : (
        <>
          <div className="w-full flex flex-col gap-x-5 gap-y-2">
            <p className="font-bold text-3xl text-white mb-4">Dashboard</p>
            <div className="flex lg:flex-row flex-col gap-y-5 gap-x-5">
              <DashboardCard
                icon={<BsPersonWorkspace color="#2e1cc9" />}
                title="Total Employees"
                value={totalEmployees}
              />
              <DashboardCard
                icon={<GrVirtualMachine color="#2e1cc9" />}
                title="Total Machines"
                value={totalMachines}
              />
              <DashboardCard
                icon={<FaTools color="#2e1cc9" />}
                title="Total Tools"
                value={totalTools}
              />
              <DashboardCard
                icon={<ImFileOpenoffice color="#2e1cc9" />}
                title="Total Jobs"
                value={totalJobs}
              />
            </div>
          </div>

          <div className="flex flex-row gap-x-5 px-5 mb-4 justify-center items-center w-full">
            <Suspense fallback={<p className="text-white text-center">Loading Charts...</p>}>
              <div className="w-[50%]">
                <LeftChart />
              </div>
              <div className="w-[50%]">
                <BigChart />
              </div>
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
};

const DashboardCard = ({ icon, title, value }) => (
  <div className="bg-gray-800 p-8 lg:w-[25%] w-[100%]">
    <p className="text-light-gray-500 flex flex-row justify-start items-center gap-x-3 text-xl text-white">
      <span className="p-1 bg-[#8177d5] rounded-md">{icon}</span>
      {title}
    </p>
    <p className="mt-3 font-semibold text-white text-2xl">{value}</p>
    <p className="text-sm text-gray-500">Active</p>
  </div>
);

export default Homepage;
