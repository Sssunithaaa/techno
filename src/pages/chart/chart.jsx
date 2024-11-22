// Charts.jsx
import React, { useState, useEffect } from "react";
import "./chart.css";

import { fetchShiftsForDay1 } from "../../Charts/shift1chart/shift1chart.jsx";
import { fetchShiftsForDay2 } from "../../Charts/shift2chart/shift2chart.jsx";
import { fetchShiftsForDay3 } from "../../Charts/shift3chart/shift3chart.jsx";
import Shift1Chart from "../../Charts/shift1chart/shift1chart.jsx";
import Shift2Chart from "../../Charts/shift2chart/shift2chart.jsx";
import Shift3Chart from "../../Charts/shift3chart/shift3chart.jsx";
import MeanChart from "../../Charts/MeanChart/Meanchart.jsx";
import FilterMenu from "../../Charts/FilterMenu.js";

const Charts = ({ onDayChange }) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date();
  const currentDay = days[date.getDay()];
  const [selectedDay, setSelectedDay] = useState(currentDay);
  const [onDayChangeShift1, setOnDayChangeShift1] = useState([]);
  const [onDayChangeShift2, setOnDayChangeShift2] = useState([]);
  const [onDayChangeShift3, setOnDayChangeShift3] = useState([]);

  const handleDayChange = (selectedDay) => {
    setSelectedDay(selectedDay);
  };

  useEffect(() => {
    const fetchData = async () => {
      const dataForSelectedDay1 = await fetchShiftsForDay1(selectedDay);
      setOnDayChangeShift1(dataForSelectedDay1);
      const dataForSelectedDay2 = await fetchShiftsForDay2(selectedDay);
      setOnDayChangeShift2(dataForSelectedDay2);
      const dataForSelectedDay3 = await fetchShiftsForDay3(selectedDay);
      setOnDayChangeShift3(dataForSelectedDay3);

      //   const dataForSelectedDayMean = await fetchShiftsForDayMean(selectedDay);
      //   setOnDayChangeMeanShift(dataForSelectedDayMean);
    };

    fetchData();
  }, [selectedDay]);

  return (
    <div className="ChartsContainer">
      <div className="filterBox">
        <div className="chart filterChart">
          <FilterMenu onDayChange={handleDayChange} />
        </div>
      </div>
      <div className="chartbox box1">
        <div className="d-chart">
          Morning Shift
          <Shift1Chart
            selectedDay={selectedDay}
            OnDayChangeShift1={onDayChangeShift1}
          />
        </div>
      </div>
      <div className="chartbox box2">
        <div className="d-chart">
          Afternoon Shift
          <Shift2Chart
            selectedDay={selectedDay}
            OnDayChangeShift2={onDayChangeShift2}
          />
        </div>
      </div>
      <div className="chartbox box3">
        <div className="d-chart">
          Night Shift
          <Shift3Chart
            selectedDay={selectedDay}
            OnDayChangeShift3={onDayChangeShift3}
          />
        </div>
      </div>
      <div className="chartbox box4">
        <div className="d-chart">
          Mean Chart
          <MeanChart
            OnDayChangeShift1={onDayChangeShift1}
            OnDayChangeShift2={onDayChangeShift2}
            OnDayChangeShift3={onDayChangeShift3}
          />
        </div>
      </div>
    </div>
  );
};

export default Charts;
