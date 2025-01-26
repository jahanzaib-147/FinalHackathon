import { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";

const AccountCreationPage = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);

  const setPassword = (password) => {
    // Logic to set the password, e.g., update the state or make an API call
    console.log("Password set to:", password);
  };

  const handleNextStep = () => {
    if (step === 1) {
      alert("A password has been sent to your email");
      setStep(2);
    } else if (step === 2) {
      setPassword(newPassword);
      alert("Password changed successfully!");
    }
  };

  return (
    <Box style={{ padding: "2rem", backgroundColor: "#f5f5f5" }}>
      <Typography variant="h4" gutterBottom>
        Account Creation
      </Typography>

      {step === 1 && (
        <>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleNextStep}
          >
            Send Password
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <TextField
            label="New Password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleNextStep}
          >
            Change Password
          </Button>
        </>
      )}
    </Box>
  );
};

export default AccountCreationPage;
