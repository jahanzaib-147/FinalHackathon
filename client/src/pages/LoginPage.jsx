import { useState } from "react";
import { TextField, Button, Grid, Typography, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://192.168.159.92:5000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          // Save the token, userId, and isAdmin to localStorage
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("isAdmin", JSON.stringify(data.isAdmin));

          // Redirect to Dashboard or AdminPanel based on isAdmin
          if (data.isAdmin) {
            navigate("/dashboard"); // Redirect to Admin Panel if admin
          } else {
            navigate("/"); // Redirect to Dashboard if user
          }
        } else {
          alert("Invalid credentials. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
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
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            name="password"
            value={credentials.password}
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
            Login
          </Button>
          <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
            <Grid item>
              <Typography variant="body2">
                Don&apos;t have an account?{" "}
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
