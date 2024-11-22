import React, { useEffect, Suspense } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useStateContext } from "./context/ContextProvider";
import axios from "axios";
import Navbarr from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ClipLoader from "react-spinners/ClipLoader";
// Dynamically import components
const Home = React.lazy(() => import(/* webpackChunkName: "home" */ "./pages/home/home"));
const Employee = React.lazy(() => import(/* webpackChunkName: "employee" */ "./pages/employees/employees"));
const Machine = React.lazy(() => import(/* webpackChunkName: "machine" */ "./pages/machines/machine"));
const Job = React.lazy(() => import(/* webpackChunkName: "job" */ "./pages/jobs/job"));
const Tool = React.lazy(() => import(/* webpackChunkName: "tool" */ "./pages/tools/tool"));
const BreakDown = React.lazy(() => import(/* webpackChunkName: "breakdown" */ "./pages/breakdown/breakdowns"));
const Homepage = React.lazy(() => import(/* webpackChunkName: "homepage" */ "./pages/home/homepage"));
const ToolCharts = React.lazy(() => import(/* webpackChunkName: "toolCharts" */ "./pages/Toolchart/ToolCharts"));
const Daily = React.lazy(() => import(/* webpackChunkName: "daily" */ "./pages/Daily/dailyy"));
const Charts = React.lazy(() => import(/* webpackChunkName: "charts" */ "./pages/chart2/chart"));
const Resolve = React.lazy(() => import(/* webpackChunkName: "resolve" */ "./pages/breakdown/Resolve"));
const DailyTable = React.lazy(() => import(/* webpackChunkName: "dailyTable" */ "./pages/Daily/DailyTable"));
const DailyEfficiency = React.lazy(() => import(/* webpackChunkName: "dailyEfficiency" */ "./pages/Daily/DailyEfficiency"));
const Login = React.lazy(() => import(/* webpackChunkName: "login" */ "./pages/login/login"));
const SignUp = React.lazy(() => import(/* webpackChunkName: "signup" */ "./pages/login/signup"));
const AddUser = React.lazy(() => import(/* webpackChunkName: "addUser" */ "./pages/login/AddUser"));
const CollapsibleTablePage = React.lazy(() => import(/* webpackChunkName: "collapsibleTable" */ "./pages/Daily/DailyReport"));
const Parameter = React.lazy(() => import(/* webpackChunkName: "parameter" */ "./pages/Daily/Parameter"));

const App = () => {
  const dispatch = useDispatch();
  const { currentMode, activeMenu } = useStateContext();
  const user = useSelector((state) => state.user);
  const loggedInUser = localStorage.getItem("account");

  useEffect(() => {
    const checkUserInDatabase = async (userData) => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_APP_URL}/webapp/check-user/`, {
          username: userData.username,
        });

        if (response.data.exists) {
          dispatch({ type: "SET_USER_INFO", payload: userData });
        } else {
          localStorage.removeItem("account");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error checking user in database:", error);
      }
    };

    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      checkUserInDatabase(userData);
    }
  }, [dispatch, loggedInUser]);

  return (
    <div className={currentMode === "Dark" ? "light" : "light"}>
      <BrowserRouter>
        <div className="flex relative bg-main-dark-bg">
          {activeMenu && loggedInUser ? (
            <div className="w-72 fixed z-[100001] sidebar">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu && loggedInUser
                ? "bg-main-dark-bg min-h-screen overflow-x-auto md:ml-72 w-full"
                : "bg-main-dark-bg w-full min-h-screen flex-2"
            }
          >
            {loggedInUser && (
              <div className="fixed md:static bg-main-dark-bg navbar w-full">
                <Navbarr />
              </div>
            )}
            <Suspense fallback={<ClipLoader/>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/toolchart" element={<ToolCharts />} />
                {user?.userInfo?.role === "Admin" && (
                  <>
                    <Route path="/employees" element={<Employee />} />
                    <Route path="/jobs" element={<Job />} />
                    <Route path="/tools" element={<Tool />} />
                    <Route path="/breakdown" element={<BreakDown />} />
                    <Route path="/dailyentry" element={<Daily />} />
                    <Route path="/daily-report" element={<CollapsibleTablePage />} />
                    <Route path="/dailyentrytable" element={<DailyTable />} />
                    <Route path="/dailyentryefficiency" element={<DailyEfficiency />} />
                    <Route path="/machines" element={<Machine />} />
                    <Route path="/chart2" element={<Charts />} />
                    <Route path="/resolve" element={<Resolve />} />
                    <Route path="/parameters" element={<Parameter />} />
                  </>
                )}
                {user?.userInfo?.role === "Supervisor" && (
                  <>
                    <Route path="/dailyentry" element={<Daily />} />
                    <Route path="/daily-report" element={<CollapsibleTablePage />} />
                    <Route path="/dailyentrytable" element={<DailyTable />} />
                    <Route path="/dailyentryefficiency" element={<DailyEfficiency />} />
                    <Route path="/machines" element={<Machine />} />
                    <Route path="/chart2" element={<Charts />} />
                  </>
                )}
                {user?.userInfo?.role === "Incharge" && (
                  <>
                    <Route path="/tools" element={<Tool />} />
                    <Route path="/breakdown" element={<BreakDown />} />
                    <Route path="/resolve" element={<Resolve />} />
                    <Route path="/chart2" element={<Charts />} />
                    <Route path="/analytics" element="Analytics" />
                    <Route path="/reports" element="Reports" />
                    <Route path="/employees" element={<Employee />} />
                    <Route path="/jobs" element={<Job />} />
                    <Route path="/machines" element={<Machine />} />
                  </>
                )}
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/home" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                {user?.userInfo?.role === "Admin" && <Route path="/add-user" element={<AddUser />} />}
                <Route
                  path="/"
                  element={
                    loggedInUser ? (
                      <Navigate to="/home" />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
              </Routes>
            </Suspense>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
