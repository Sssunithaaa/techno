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

const ToolView = ({ open, handleClose, selectedTool, handleUpdate }) => {
  const [updatedTool, setUpdatedTool] = useState(
    selectedTool ? { ...selectedTool } : {}
  );

  const handleChange = (attribute, value) => {
    setUpdatedTool({ ...updatedTool, [attribute]: value });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>View Tool Details</DialogTitle>
      <DialogContent>
        {selectedTool ? (
          <>
            <TextField
              label="Name"
              value={updatedTool.name}
              onChange={(e) => handleChange("name", e.target.value)}
              variant="outlined"
              fullWidth
              size="large"
              margin="normal"
            />
            <TextField
              label="Code"
              value={updatedTool.code}
              onChange={(e) => handleChange("code", e.target.value)}
              variant="outlined"
              fullWidth
              size="large"
              margin="normal"
            />
            <TextField
              label="Max Length"
              value={updatedTool.maxLength}
              onChange={(e) => handleChange("maxLength", e.target.value)}
              variant="outlined"
              fullWidth
              size="large"
              margin="normal"
            />
            <TextField
              label="Cost"
              value={updatedTool.cost}
              onChange={(e) => handleChange("cost", e.target.value)}
              variant="outlined"
              fullWidth
              size="large"
              margin="normal"
            />
          </>
        ) : (
          <Typography>No tool selected</Typography>
        )}
      </DialogContent>
      <DialogActions>
        {selectedTool && (
          <>
            <Button onClick={() => handleUpdate(updatedTool)} color="primary">
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

export default ToolView;
