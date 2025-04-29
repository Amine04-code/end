// frontend/scenes/manager/invoices/Requests.jsx
import { useState, useEffect } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import axios from "axios";
import Header from "../../../components/header";

const Requests = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/leave/requests");
        setRows(res.data);
      } catch (err) {
        console.error("Error fetching leave requests:", err);
      }
    };

    fetchLeaves();
  }, []);

  const handleDecision = async (id, decision) => {
    try {
      await axios.put(`http://localhost:5000/api/leave/${id}/decision`, { status: decision });
      setRows((prev) => prev.map((row) => row._id === id ? { ...row, status: decision } : row));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "leaveType", headerName: "Leave Type", flex: 1 },
    { field: "startDate", headerName: "Start Date", flex: 1 },
    { field: "endDate", headerName: "End Date", flex: 1 },
    { field: "reason", headerName: "Reason", flex: 2 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Typography color={
          params.value === "Approved" ? colors.greenAccent[400]
            : params.value === "Rejected" ? "red"
            : colors.grey[100]
        }>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Button variant="contained" size="small" color="success" onClick={() => handleDecision(params.row._id, "Approved")}>
            Approve
          </Button>
          <Button variant="contained" size="small" color="error" onClick={() => handleDecision(params.row._id, "Rejected")}>
            Reject
          </Button>
        </Box>
      ),
    },
  ];
  const Header = ({ title, subtitle }) => {
    return (
      <Box mb="30px">
        <Typography variant="h2"  sx={{ mb: "5px" }}>
          {title}
        </Typography>
        <Typography variant="h5" sx={{ color: "#6d74e8" }}>
          {subtitle}
        </Typography>
      </Box>
    );
  };
  return (
    <Box m="20px">
      <Header title="LEAVE REQUESTS" subtitle="Approve or Reject Leave Applications" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: "#6d74e8", borderBottom: "none" },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: "transparent" },
          "& .MuiDataGrid-footerContainer": { backgroundColor: "#6d74e8" },
          "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
        }}
      >
        <DataGrid checkboxSelection rows={rows} columns={columns} getRowId={(row) => row._id} />
      </Box>
    </Box>
  );
};

export default Requests;
