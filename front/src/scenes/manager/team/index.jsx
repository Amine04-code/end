import { Box, Typography, useTheme, Select, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "axios";
import { tokens } from "../../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../../components/header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        const usersWithId = res.data.map((user) => ({
          id: user._id,
          name: user.fullname || user.name,
          email: user.email || "N/A",
          phone: user.phone || "N/A",
          access: user.role || "employee",
        }));
        setRows(usersWithId);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleAccessChange = async (id, newAccess) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, access: newAccess } : row
    );
    setRows(updatedRows);

    try {
      await axios.put(`http://localhost:5000/api/user/${id}/role`, { role: newAccess });
      console.log("Role updated successfully");
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "access",
      headerName: "Access Level",
      flex: 1,
      renderCell: (params) => {
        const { id, access } = params.row;
        const icon = access === "manager"
          ? <AdminPanelSettingsOutlinedIcon />
          : access === "accountant"
          ? <SecurityOutlinedIcon />
          : <LockOpenOutlinedIcon />;

        return (
          <Box width="100%" display="flex" alignItems="center" justifyContent="center" gap={1}>
            {icon}
            <Select
              value={access}
              onChange={(e) => handleAccessChange(id, e.target.value)}
              sx={{
                backgroundColor: "#6d74e8",
                borderRadius: "4px",
                color: colors.grey[100],
                height: "30px",
                fontSize: "14px",
                minWidth: "140px",
              }}
            >
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="accountant">Accountant</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="candidate">Candidate</MenuItem>
            </Select>
          </Box>
        );
      },
    },
  ];
  const Header = ({ title, subtitle }) => {
    return (
      <Box mb="30px">
        <Typography variant="h2" fontWeight="bold" sx={{ mb: "5px" }}>
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
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: "#6d74e8" },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700] },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": { backgroundColor: colors.blueAccent[700] },
          "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
        }}
      >
        <DataGrid checkboxSelection rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
