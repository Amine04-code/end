import React, { useState } from 'react';
import { Box, TextField, Button, Typography, IconButton, InputAdornment } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import the back arrow icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const ChangeNamee = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize the navigate hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === '') {
      setError('Please enter your password to confirm.');
      return;
    }

    // Handle form submission logic here (e.g., save the names)
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Password entered:', password);
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <Box p={2}>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton 
          onClick={handleGoBack} 
          color="primary" 
          sx={{ backgroundColor: 'rgb(255, 255, 255)', borderRadius: '50%' }}
        >
          <ArrowBackIcon /> {/* Back arrow button */}
        </IconButton>
        <Typography variant="h5" ml={2}>
          Change Your Name
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box display="flex" gap={2} mb={2}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Box>
        <TextField
          label="Enter Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
          error={!!error}
          helperText={error}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  {/* Optional: Add an icon here for extra functionality */}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained" sx={{ backgroundColor: "#8289ff", "&:hover": { backgroundColor: "#6d74e8" } }}>
          Update Name
        </Button>
      </form>
    </Box>
  );
};

export default ChangeNamee;
