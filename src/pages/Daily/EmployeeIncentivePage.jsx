import React, { useRef,useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";

const LineItemTable = ({ lineItems, includeBaseIncentive, employee }) => {
  const baseIncentive = lineItems && lineItems[0]?.incentive_value;

  let totalIncentive = lineItems ? lineItems.reduce((acc, curr) => acc + curr.incentive_received, 0) : 0;
  if (includeBaseIncentive && baseIncentive) {
    totalIncentive += baseIncentive;
  }

  const tableRef = useRef(null);
  const hiddenTableRef = useRef(null);
 const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  return (
    <div className="mt-4">
      <div>
        <h3 className="mb-4 font-semibold text-[20px]">Base Incentive: {baseIncentive}</h3>
      </div>
      <table ref={tableRef} className="min-w-full divide-y divide-gray-200" id="table-to-xls">
        <thead className=" bg-secondary-dark-bg">
          <tr>
            
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200  uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200  uppercase tracking-wider">
              Shift Number
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200  uppercase tracking-wider">
              Efficiency
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200  uppercase tracking-wider">
              Incentive
            </th>
          </tr>
        </thead>
        <tbody className=" divide-y text-center  bg-secondary-dark-bg divide-gray-700">
          {lineItems && lineItems.map((item, index) => (
            <tr key={index}>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200 ">{item.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200 ">{item.shift_number}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200 ">{item.efficiency.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200 ">{item.incentive_received.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-right">
        <p className="text-lg text-gray-700">Total Incentive: {totalIncentive.toFixed(2)}</p>
      </div>

      {/* Hidden table for export with employee details */}
      <table ref={hiddenTableRef} className="hidden">
        <thead>
          <tr>
            <th colSpan="5">Date: {date}</th>
            
          </tr>
          <tr>
            <th colSpan="2">Employee SSN: {employee.emp_ssn}</th>
            <th colSpan="3">Employee Name: {employee.emp_name}</th>
          </tr>
          <tr>
            <th colSpan="2">Base Incentive: {baseIncentive}</th>
            <th colSpan="3">Total Incentive: {totalIncentive.toFixed(2)}</th>
          </tr>
          <tr>
            <th>Sl No.</th>
            <th>Date</th>
            <th>Shift Number</th>
            <th>Efficiency</th>
            <th>Incentive</th>
          </tr>
        </thead>
        <tbody>
          {lineItems && lineItems.map((item, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{item.date}</td>
              <td>{item.shift_number}</td>
              <td>{item.efficiency.toFixed(2)}</td>
              <td>{item.incentive_received.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <DownloadTableExcel filename="Report" sheet="users" currentTableRef={hiddenTableRef.current}>
        <button className='flex justify-center mx-auto text-white bg-indigo-600 px-4 py-4 mt-2 rounded-md'>Export excel</button>
      </DownloadTableExcel>
    </div>
  );
};


const EmployeeIncentivePage = ({ data, includeBaseIncentive, setIncludeBaseIncentive, employee }) => {
  return (
    <div className=" m-2 pt-2 md:m-10 mt-24 md:p-10 bg-white  rounded-3xl">
      <div className="flex justify-between items-center">
        <p className="text-lg text-white font-semibold uppercase">Employee Incentive</p>
        <div>
          <input 
            type="checkbox" 
            checked={includeBaseIncentive} 
            onChange={() => setIncludeBaseIncentive(!includeBaseIncentive)} 
            className="mr-2" 
          />
          <label htmlFor="baseIncentive" className="text-sm text-gray-700 ">Include base incentive</label>
        </div>
      </div>
      <div>
        <label htmlFor="employee" className="text-lg text-gray-900 font-semibold ">Employee SSN: {employee?.emp_ssn}</label><br/>
        <label htmlFor="employee" className="text-lg text-gray-900 font-semibold ">Employee Name: {employee?.emp_name}</label>
      </div>
      <div className="mt-2">
        <LineItemTable lineItems={data} includeBaseIncentive={includeBaseIncentive} employee={employee} />
      </div>
    </div>
  );
};

export default EmployeeIncentivePage;
