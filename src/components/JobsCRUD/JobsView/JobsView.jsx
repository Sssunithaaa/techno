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

const JobView = ({ open, handleClose, selectedJob, handleUpdate }) => {
  const [updatedJob, setUpdatedJob] = useState(
    selectedJob ? { ...selectedJob } : {}
  );

  const handleChange = (attribute, value) => {
    setUpdatedJob({ ...updatedJob, [attribute]: value });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>View Job Details</DialogTitle>
      <DialogContent>
        {selectedJob ? (
          <>
            <TextField
              label="Job ID"
              value={updatedJob.job_id}
              disabled
              variant="outlined"
              fullWidth
              size="large"
              margin="normal"
            />
            <TextField
              label="Name"
              value={updatedJob.name}
              onChange={(e) => handleChange("name", e.target.value)}
              variant="outlined"
              fullWidth
              size="large"
              margin="normal"
            />
            <TextField
              label="Length"
              value={updatedJob.length}
              onChange={(e) => handleChange("length", e.target.value)}
              variant="outlined"
              fullWidth
              size="large"
              margin="normal"
            />
            <TextField
              label="No. of Holes"
              value={updatedJob.holesCount}
              onChange={(e) => handleChange("holesCount", e.target.value)}
              variant="outlined"
              fullWidth
              size="large"
              margin="normal"
            />
            <TextField
              label="Tool Code"
              value={updatedJob.toolCode}
              onChange={(e) => handleChange("toolCode", e.target.value)}
              variant="outlined"
              fullWidth
              size="large"
              margin="normal"
            />
          </>
        ) : (
          <Typography>No job selected</Typography>
        )}
      </DialogContent>
      <DialogActions>
        {selectedJob && (
          <>
            <Button onClick={() => handleUpdate(updatedJob)} color="primary">
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

export default JobView;
