import { useState, useEffect } from "react";
import { Button, Typography, Grid, Box } from "@mui/material";
import QRCode from "react-qr-code";

const SlipGeneration = () => {
  // State variables
  const [tokenNumber, setTokenNumber] = useState(null);
  const [appointmentDetails] = useState({
    date: "2025-01-25",
    time: "10:00 AM",
    location: "Head Office, Karachi",
  });

  useEffect(() => {
    // Generate token number when the component mounts
    const generatedToken = Math.floor(Math.random() * 1e6); // Random 6-digit token
    setTokenNumber(generatedToken);
  }, []);

  // Function to download the slip
  const handleDownload = () => {
    const slipData = `
      Token Number: ${tokenNumber}
      Appointment Date: ${appointmentDetails.date}
      Appointment Time: ${appointmentDetails.time}
      Location: ${appointmentDetails.location}
    `;

    const blob = new Blob([slipData], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Slip_${tokenNumber}.txt`; // Download file with token number
    a.click();
  };

  if (!tokenNumber) {
    return <Typography variant="h6">Generating your token...</Typography>;
  }

  return (
    <Box style={{ padding: "2rem", backgroundColor: "#f5f5f5" }}>
      <Typography variant="h5" gutterBottom>
        Slip Generation
      </Typography>

      {/* Display token number and QR code */}
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h6">Token Number: {tokenNumber}</Typography>
        </Grid>
        <Grid item>
          <QRCode value={tokenNumber.toString()} size={128} />
        </Grid>
        <Grid item>
          <Typography variant="body1">Appointment Date: {appointmentDetails.date}</Typography>
          <Typography variant="body1">Appointment Time: {appointmentDetails.time}</Typography>
          <Typography variant="body1">Location: {appointmentDetails.location}</Typography>
        </Grid>
      </Grid>

      {/* Button to download the slip */}
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "2rem" }}
        onClick={handleDownload}
      >
        Download Slip
      </Button>
    </Box>
  );
};

export default SlipGeneration;
