import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";

const Updateinfom = () => {
  const theme = useTheme();
  const colors = {
    primary: theme.palette.primary.main,
    text: theme.palette.text.primary,
    hover: theme.palette.action.hover,
    border: theme.palette.divider,
  };

  return (
    <Box p={3}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        Update Your Information
      </Typography>
      <Box mt={3}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: "500",
            padding: "8px 16px",
            borderRadius: "25px",
            border: `1px solid ${colors.border}`,
            backgroundColor: "transparent",
            color: colors.text,
            display: "flex",
            alignItems: "center",
            "&:hover": {
              backgroundColor: colors.hover,
            },
          }}
        >
          <PersonIcon sx={{ mr: 1 }} />
          <Link
            to="/update/name"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Change Name
          </Link>
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: "500",
            padding: "8px 16px",
            borderRadius: "25px",
            border: `1px solid ${colors.border}`,
            backgroundColor: "transparent",
            color: colors.text,
            display: "flex",
            alignItems: "center",
            "&:hover": {
              backgroundColor: colors.hover,
            },
          }}
        >
          <EmailIcon sx={{ mr: 1 }} />
          <Link
            to="/update/email"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Change Email Address
          </Link>
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: "500",
            padding: "8px 16px",
            borderRadius: "25px",
            border: `1px solid ${colors.border}`,
            backgroundColor: "transparent",
            color: colors.text,
            display: "flex",
            alignItems: "center",
            "&:hover": {
              backgroundColor: colors.hover,
            },
          }}
        >
          <LockIcon sx={{ mr: 1 }} />
          <Link
            to="/update/password"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Change Password
          </Link>
        </Typography>

       
      </Box>
    </Box>
  );
};

export default Updateinfom;  // Corrected export name
