import React, { useState, useEffect } from "react";
import Charts from "../pages/chart/chart";

function FilterMenu({ onDayChange }) {
  const [selectedDay, setSelectedDay] = useState("All Days");

  const handleDayChange = (event) => {
    const selected = event.target.value;
    setSelectedDay(selected);
    onDayChange(selected);
  };

  useEffect(() => {}, [selectedDay]);

  return (
    <div>
      {/* <Home selectedDay={selectedDay} /> */}
      <select
        value={selectedDay}
        onChange={handleDayChange}
        style={{
          borderRadius: "10px",
          padding: "0",
          width: "100%",
          height: "25px",
          textAlign: "center",
          fontSize: "1em",
          backgroundColor: "#F0F0f0",
        }}
      >
        <option value="All Days">All Days</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
      </select>
      {/* <div className="box box2">
        SHIFT1
        <Shift1Chart selectedDay={selectedDay} OnDayChangeShift1={onDayChangeShift1} />
      </div>
      <div className="box box3">
        SHIFT2
        <Shift2Chart selectedDay={selectedDay} OnDayChangeShift2={onDayChangeShift2}/>
      </div>

      <div className="box box5">
        SHIFT3
        <Shift3Chart selectedDay={selectedDay} OnDayChangeShift3={onDayChangeShift3}/>
      </div>
      <div className="box box6">
        MEAN SHIFT
        <MeanChart OnDayChangeShift1={onDayChangeShift1} OnDayChangeShift2={onDayChangeShift2} OnDayChangeShift3={onDayChangeShift3} />
      </div> */}
    </div>
  );
}

export default FilterMenu;
