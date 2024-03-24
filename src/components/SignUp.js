import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [userExistsError, setUserExistsError] = useState('');
  const navigate=useNavigate()


  const onSubmitForm=()=>
  {
      fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname: firstName,
          lname: lastName,
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            // Registration successful
            navigate('/login')
          } else if (data.error === "User Exists") {
            // User already exists
            
            setUserExistsError('User already exists. Please choose a different email address.');
          } else {
            // Error occurred
            
            alert("Error occurred. Please try again.");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Error occurred. Please try again.");
        });

  }

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    // For simplicity, let's check if the password is at least 6 characters long
    return password.length >= 6;
  };

  const handleSignUp = () => {

      // Perform form validation
    const validationErrors = {};

    if (!firstName.trim()) {
      validationErrors.firstName = "Please enter your first name.";
    }

    if (!lastName.trim()) {
      validationErrors.lastName = "Please enter your last name.";
    }

    if (!isEmailValid(email.trim())) {
      validationErrors.email = "Please enter a valid email address";
    }

    if (!isPasswordValid(password.trim())) {
      validationErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(validationErrors);
    

    // Implement your signup logic here
    if((Object.keys(validationErrors).length === 0))
    {
      onSubmitForm()

    }
  };


  return (
    <Container component="main" maxWidth="xs"   className="d-flex align-items-center justify-content-center"
         style={{ minHeight: "100vh" }} >
      <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form style={{ width: '100%', marginTop: '20px' }} noValidate>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="Enter your first name"
            name="First Name"
            autoComplete="first Name"
            autoFocus
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Enter your last name"
            name="last Name"
            autoComplete="last Name"
            autoFocus
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email||!!userExistsError}
            helperText={errors.email||userExistsError}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSignUp}
            style={{ marginTop: '20px' }}
          >
            Sign Up
          </Button>
        </form>
        <Link
            fullWidth
            onClick={()=>{}}
            style={{ marginTop: '20px' }}
            to={"/login"}
          >
           If you have already account for Login Here
          </Link>
      </Paper>
    </Container>
  );
};

export default SignUp;
