import { useState } from "react";
import { TextField, Button, Grid, Typography, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cnic: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userDetails.password !== userDetails.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const raw = JSON.stringify({
        cnic: userDetails.cnic,
        email: userDetails.email,
        name: userDetails.name,
        password: userDetails.password,
      });

      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: raw,
      });

      if (response.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(`Signup failed: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Signup failed: ${error.message}`);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ paddingTop: "3rem" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          borderRadius: 2,
          backgroundColor: "#fff",
          boxShadow: 3,
        }}
      >
        <Typography variant="h5">Signup</Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            name="name"
            value={userDetails.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="CNIC"
            fullWidth
            margin="normal"
            name="cnic"
            value={userDetails.cnic}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            name="password"
            value={userDetails.password}
            onChange={handleChange}
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            name="confirmPassword"
            value={userDetails.confirmPassword}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 2 }}
            color="primary"
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
            <Grid item>
              <Typography variant="body2">
                Already have an account?{" "}
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
