import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const AddEmployee = ({ open, handleClose, handleAddEmployee }) => {
  const [newSSN, setNewSSN] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newAddress, setNewAddress] = useState("");

  const handleAdd = () => {
    // Validate if all required fields are filled
    if (newSSN && newName && newPhoneNumber && newAddress) {
      const newEmployee = {
        ssn: newSSN,
        name: newName,
        phoneNumber: newPhoneNumber,
        address: newAddress,
      };
      handleAddEmployee(newEmployee);
      // Reset fields after adding
      setNewSSN("");
      setNewName("");
      setNewPhoneNumber("");
      setNewAddress("");
      handleClose();
    } else {
      // Handle validation error, show error message or prevent submission
      alert("Please fill in all fields");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Employee</DialogTitle>
      <DialogContent>
        <TextField
          label="SSN"
          value={newSSN}
          onChange={(e) => setNewSSN(e.target.value)}
          variant="outlined"
          fullWidth
          size="large"
          margin="normal"
        />
        <TextField
          label="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          variant="outlined"
          fullWidth
          size="large"
          margin="normal"
        />
        <TextField
          label="Phone Number"
          value={newPhoneNumber}
          onChange={(e) => setNewPhoneNumber(e.target.value)}
          variant="outlined"
          fullWidth
          size="large"
          margin="normal"
        />
        <TextField
          label="Address"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          variant="outlined"
          fullWidth
          size="large"
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEmployee;
