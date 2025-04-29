// frontend/scenes/employee/requestleave/RequestLeave.jsx
import { useState } from "react";
import { Typography, Button, TextField, Box, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import axios from "axios";

const RequestLeave = () => {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/leave/request", {
        name: localStorage.getItem("fullname"), // or fetch from auth context
        email: localStorage.getItem("email"),
        phone: localStorage.getItem("phone"),
        userId: localStorage.getItem("userId"), 
        leaveType,
        startDate,
        endDate,
        reason,
      });
      alert("Leave request submitted successfully!");
      setLeaveType("");
      setStartDate("");
      setEndDate("");
      setReason("");
    } catch (error) {
      console.error("Error submitting leave request:", error);
      alert("Failed to submit leave request");
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
        padding: 3, backgroundColor: 'transparent', borderRadius: 2, boxShadow: 3, width: '100%', maxWidth: 600, margin: 'auto'
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Request Leave
      </Typography>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="leave-type-label">Leave Type</InputLabel>
        <Select
          labelId="leave-type-label"
          label="Leave Type"
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
        >
          <MenuItem value="Sick Leave">Sick Leave</MenuItem>
          <MenuItem value="Vacation">Vacation</MenuItem>
          <MenuItem value="Personal Leave">Personal Leave</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Start Date"
        type="date"
        fullWidth
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        sx={{ marginBottom: 2 }}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="End Date"
        type="date"
        fullWidth
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        sx={{ marginBottom: 2 }}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="Reason"
        multiline
        rows={4}
        fullWidth
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <Button 
        variant="contained" 
        sx={{ backgroundColor: "#8289ff", "&:hover": { backgroundColor: "#6d74e8" } }}
        onClick={handleSubmit}
      >
        Submit Request
      </Button>
    </Box>
  );
};

export default RequestLeave;
