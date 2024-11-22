// Tools.js

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  TablePagination,
} from "@mui/material";

import { ToolsData } from "../../data";
import ToolView from "../../components/toolsCRUD/ToolView/ToolView";
import AddTool from "../../components/toolsCRUD/toolAdd/Tooladd";
import "./tools.css";

const Tools = () => {
  const [data, setData] = useState(ToolsData);
  const [newToolName, setNewToolName] = useState("");
  const [newToolCode, setNewToolCode] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newMaxLength, setNewMaxLength] = useState("");
  const [newCost, setNewCost] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [openView, setOpenView] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleAddTool = (newTool) => {
    setData([...data, newTool]);
    setOpenAddDialog(false); // Close the AddTool dialog after adding a tool
  };

  const handleDeleteItem = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleViewTool = (tool) => {
    setSelectedTool(tool);
    setOpenView(true);
  };

  const handleCloseView = () => {
    setOpenView(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = () => {
    const filteredData = ToolsData.filter((tool) =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setData(filteredData);
  };

  return (
    <div className="tool-container">
      <h1>TOOLS MANAGEMENT</h1>
      <div className="text-field-container">
        <Button
          className="add-button"
          variant="contained"
          color="primary"
          onClick={handleOpenAddDialog}
        >
          Add Item
        </Button>
        <TextField
          className="text-field"
          label="Search Tool Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="table-header">ID</TableCell>
              <TableCell className="table-header">Tool Name</TableCell>
              <TableCell className="table-header">Tool Code</TableCell>
              <TableCell className="table-header">Quantity</TableCell>
              <TableCell className="table-header">Max Length</TableCell>
              <TableCell className="table-header">Cost</TableCell>
              <TableCell className="table-header">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="table-cell">{row.id}</TableCell>
                  <TableCell className="table-cell">{row.name}</TableCell>
                  <TableCell className="table-cell">{row.code}</TableCell>
                  <TableCell className="table-cell">{row.quantity}</TableCell>
                  <TableCell className="table-cell">{row.maxLength}</TableCell>
                  <TableCell className="table-cell">{row.cost}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDeleteItem(row.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginLeft: 10 }}
                      onClick={() => handleViewTool(row)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        className="tool-pagination"
        rowsPerPageOptions={[2, 4, 10, 15, { label: "All", value: -1 }]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Render the ToolView component */}
      <ToolView
        open={openView}
        handleClose={handleCloseView}
        selectedTool={selectedTool}
      />

      {/* Render the AddTool component */}
      <AddTool
        open={openAddDialog}
        handleClose={() => setOpenAddDialog(false)}
        handleAddTool={handleAddTool}
      />
    </div>
  );
};

export default Tools;
