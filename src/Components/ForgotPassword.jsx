import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        if (!email) {
       setError('Please enter your email');
       return;
     }
     const response=await axios.post(`http://localhost:5632/login/reset`, {email:email});
     // Placeholder for API call
     setTimeout(() => {
       setMessage('If an account with that email exists, a password reset link has been sent.');
       setError('');
     }, 1000);
    }catch(e){console.log('Error!! in fetching otp');}
  };

  return (
    < Container maxWidth="sm">
      <Box className="p-8 bg-white rounded-lg shadow-md mt-16">
        <Typography variant="h4" component="h1" className="mb-8 text-center">
          Forgot Password
        </Typography>
        {message && <Alert severity="success" className="mb-4">{message}</Alert>}
        {error && <Alert severity="error" className="mb-4">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="bg-blue-500 hover:bg-blue-700 text-white"
          >
            Reset Password
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
