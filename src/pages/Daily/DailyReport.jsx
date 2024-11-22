import React, { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DownloadTableExcel } from "react-export-table-to-excel";

const fetchDailyReport = async (selectedDate) => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_URL}/webapp/generate-report/${selectedDate}/`
  );
  return response.data;
};

const Row = ({ row, index }) => {
  const rowStyle = index % 2 === 0 ? { backgroundColor: "#f2f2f2" } : { backgroundColor: "#ffffff" };

  return (
    <TableRow sx={{ "& > *": { borderBottom: "unset" }, ...rowStyle }}>
      <TableCell component="th" scope="row">
        {row.machine_id}
      </TableCell>
      <TableCell align="center">{row.component_name}</TableCell>
      <TableCell align="center">{row.operation_no}</TableCell>
      <TableCell align="center">{row.shift_target}</TableCell>
      <TableCell align="center">{row.quantity_achieved_shift_1}</TableCell>
      <TableCell align="center">{row.shift_1_percentage}</TableCell>
      <TableCell align="center">{row.quantity_achieved_shift_2}</TableCell>
      <TableCell align="center">{row.shift_2_percentage}</TableCell>
      <TableCell align="center">{row.quantity_achieved_shift_3}</TableCell>
      <TableCell align="center">{row.shift_3_percentage}</TableCell>
      <TableCell align="center">{row.per_day_target}</TableCell>
      <TableCell align="center">{row.per_day_achieved}</TableCell>
      <TableCell align="center">{row.per_day_achieved_percentage}</TableCell>
    </TableRow>
  );
};

const CollapsibleTablePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const tableRef = useRef(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dailyReport", selectedDate],
    queryFn: () => fetchDailyReport(selectedDate),
    keepPreviousData: true,
  });

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="mx-5 mt-10 font-semibold">
      <h1 className="my-3 flex mx-auto justify-center text-3xl text-[#F7F7F7] font-semibold">
        Daily Report
      </h1>
      <div className="flex w-fit gap-x-3 p-3 m-3 bg-white justify-center items-center mx-auto">
        <label htmlFor="date" className="block text-lg font-medium text-gray-700">
          Date:
        </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-sm shadow-sm focus:ring focus:ring-indigo-500"
        />
      </div>

      <TableContainer component={Paper}>
        <Table ref={tableRef} aria-label="collapsible table" id="table-to-xls">
          <TableHead>
            <TableRow>
              <TableCell>Machine ID</TableCell>
              <TableCell align="center">Component Name</TableCell>
              <TableCell align="center">Operation Number</TableCell>
              <TableCell align="center">Shift Target</TableCell>
              <TableCell align="center">Qty Achieved (Shift 1)</TableCell>
              <TableCell align="center">Shift 1%</TableCell>
              <TableCell align="center">Qty Achieved (Shift 2)</TableCell>
              <TableCell align="center">Shift 2%</TableCell>
              <TableCell align="center">Qty Achieved (Shift 3)</TableCell>
              <TableCell align="center">Shift 3%</TableCell>
              <TableCell align="center">Per Day Target</TableCell>
              <TableCell align="center">Per Day Achieved</TableCell>
              <TableCell align="center">Per Day Achieved Percentage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => (
              <Row key={index} index={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DownloadTableExcel filename="Report" sheet="Daily Report" currentTableRef={tableRef.current}>
        <button className="flex justify-center mx-auto text-white bg-indigo-600 px-4 py-2 my-6 rounded-md hover:bg-indigo-700">
          Export to Excel
        </button>
      </DownloadTableExcel>
    </div>
  );
};

export default CollapsibleTablePage;
