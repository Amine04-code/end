import React, { useState } from 'react';
import { Box, TextField, Button, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const ChangePassworde = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (oldPassword === '') {
      setError('Please enter your Old password.');
      return;
    }

    if (newPassword === '') {
      setError('Please enter your New password.');
      return;
    }

    if (confirmPassword === '') {
      setError('Please confirm your new password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMatchError('New passwords do not match.');
      return;
    }

    setError('');
    setPasswordMatchError('');

    // Proceed with password change logic
    console.log('Old Password:', oldPassword);
    console.log('New Password:', newPassword);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box p={2}>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={handleGoBack} color="primary" sx={{ backgroundColor: 'rgb(255, 255, 255)', borderRadius: '50%' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" ml={2}>
          Change Password
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Old Password"
          variant="outlined"
          type="password"
          fullWidth
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          sx={{ mb: 2 }}
          error={!!error}
          helperText={error}
        />
        <TextField
          label="New Password"
          variant="outlined"
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{ mb: 2 }}
          error={!!error || !!passwordMatchError}
          helperText={passwordMatchError || error}
        />
        <TextField
          label="Confirm New Password"
          variant="outlined"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ mb: 2 }}
          error={!!passwordMatchError}
          helperText={passwordMatchError}
        />
        <Button type="submit" variant="contained" sx={{ backgroundColor: "#8289ff", "&:hover": { backgroundColor: "#6d74e8" } }}>
          Update Password
        </Button>
      </form>
    </Box>
  );
};

export default ChangePassworde;
