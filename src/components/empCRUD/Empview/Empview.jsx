import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from "@mui/material";

const EmployeeView = ({
  open,
  handleClose,
  selectedEmployee,
  handleUpdate,
}) => {
  const [updatedEmployee, setUpdatedEmployee] = useState(
    selectedEmployee ? { ...selectedEmployee } : {}
  );

  const handleChange = (attribute, value) => {
    setUpdatedEmployee({ ...updatedEmployee, [attribute]: value });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>View Employee Details</DialogTitle>
      <DialogContent>
        {selectedEmployee ? (
          <>
            <TextField
              label="SSN"
              value={updatedEmployee.ssn}
              onChange={(e) => handleChange("ssn", e.target.value)}
              variant="outlined"
              fullWidth
              size="large"
              margin="normal"
            />
            <TextField
              label="Name"
              value={updatedEmployee.name}
              onChange={(e) => handleChange("name", e.target.value)}
              variant="outlined"
              fullWidth
              size="large"
              margin="normal"
            />
            <TextField
              label="Phone Number"
              value={updatedEmployee.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              variant="outlined"
              fullWidth
              size="large"
              margin="normal"
            />
            <TextField
              label="Address"
              value={updatedEmployee.address}
              onChange={(e) => handleChange("address", e.target.value)}
              variant="outlined"
              fullWidth
              size="large"
              margin="normal"
            />
          </>
        ) : (
          <Typography>No employee selected</Typography>
        )}
      </DialogContent>
      <DialogActions>
        {selectedEmployee && (
          <>
            <Button
              onClick={() => handleUpdate(updatedEmployee)}
              color="primary"
            >
              Update
            </Button>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeView;
