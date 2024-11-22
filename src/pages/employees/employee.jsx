// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   TextField,
//   TablePagination,
// } from "@mui/material";
// import { employeesData } from "../../data"; // Corrected import
// import EmployeeView from "../../components/empCRUD/Empview/Empview";
// import AddEmployee from "../../components/empCRUD/Empadd/Empadd";
// import "./employee.css";
//
// const Employees = () => {
//   const [data, setData] = useState(employeesData);
//   const [newSSN, setNewSSN] = useState("");
//   const [newName, setNewName] = useState("");
//   const [newPhoneNumber, setNewPhoneNumber] = useState("");
//   const [newAddress, setNewAddress] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [openView, setOpenView] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [openAddDialog, setOpenAddDialog] = useState(false); // State to control the visibility of the AddEmployee dialog
//
//   const handleAddEmployee = (newEmployee) => {
//     setData([...data, newEmployee]);
//   };
//
//   const handleDeleteEmployee = (id) => {
//     setData(data.filter((employee) => employee.id !== id));
//   };
//
//   const handleViewEmployee = (employee) => {
//     setSelectedEmployee(employee);
//     setOpenView(true);
//   };
//
//   const handleCloseView = () => {
//     setOpenView(false);
//   };
//
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };
//
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };
//
//   const handleSearch = () => {
//     const filteredData = employeesData.filter((employee) =>
//       employee.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setData(filteredData);
//   };
//
//   const handleCloseAddDialog = () => {
//     setOpenAddDialog(false);
//   };
//
//   return (
//     <div className="employee-container">
//       <h1>EMPLOYEES MANAGEMENT</h1>
//       <div className="text-field-container">
//         <div className="flex flex-row gap-2 justify-between ">
//           <Button
//             className="m-2"
//             variant="contained"
//             color="primary"
//             onClick={() => setOpenAddDialog(true)}
//           >
//             Add Employee
//           </Button>
//
//           <TextField
//             className="text-field"
//             label="Search Employee Name"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             onKeyDown={handleSearch}
//           />
//         </div>
//       </div>
//
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell className="table-header">ID</TableCell>
//               <TableCell className="table-header">SSN</TableCell>
//               <TableCell className="table-header">Name</TableCell>
//               <TableCell className="table-header">Phone Number</TableCell>
//               <TableCell className="table-header">Address</TableCell>
//               <TableCell className="table-header">Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {(rowsPerPage > 0
//               ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               : data
//             ).map((employee) => (
//               <TableRow key={employee.id}>
//                 <TableCell className="table-cell">{employee.id}</TableCell>
//                 <TableCell className="table-cell">{employee.ssn}</TableCell>
//                 <TableCell className="table-cell">{employee.name}</TableCell>
//                 <TableCell className="table-cell">
//                   {employee.phoneNumber}
//                 </TableCell>
//                 <TableCell className="table-cell">{employee.address}</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => handleDeleteEmployee(employee.id)}
//                   >
//                     Delete
//                   </Button>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     style={{ marginLeft: 10 }}
//                     onClick={() => handleViewEmployee(employee)}
//                   >
//                     View
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//
//       <TablePagination
//         className="employee-pagination"
//         rowsPerPageOptions={[2, 4, 10, 15, { label: "All", value: -1 }]}
//         component="div"
//         count={data.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//
//       {/* Render the EmployeeView component */}
//       <EmployeeView
//         open={openView}
//         handleClose={handleCloseView}
//         selectedEmployee={selectedEmployee}
//       />
//
//       {/* Render the AddEmployee component */}
//       <AddEmployee
//         open={openAddDialog}
//         handleClose={handleCloseAddDialog}
//         handleAddEmployee={handleAddEmployee}
//       />
//     </div>
//   );
// };
//
// export default Employees;
