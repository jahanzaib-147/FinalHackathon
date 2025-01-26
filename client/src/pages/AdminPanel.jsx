import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";

// Mock Data for Applications (Replace with data fetched from your API)
const mockApplications = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    city: "Karachi",
    country: "Pakistan",
    category: "Wedding Loans",
    subcategory: "Valima",
    loanAmount: 100000,
    status: "Pending",
    guarantors: [
      { name: "Ali", email: "ali@example.com", location: "Karachi", cnic: "12345" },
      { name: "Sara", email: "sara@example.com", location: "Karachi", cnic: "67890" },
    ],
  },
  // Add more mock applications as needed
];

const AdminPanel = () => {
  const [applications, setApplications] = useState(mockApplications);
  const [filteredApplications, setFilteredApplications] = useState(applications);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [tokenNumber, setTokenNumber] = useState("");
  const [availableSlots] = useState([
    "2025-01-30 10:00 AM",
    "2025-01-30 11:00 AM",
    "2025-01-30 01:00 PM",
  ]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch applications from the backend (Replace mock data with an API call)
    setLoading(true);
    setTimeout(() => {
      setApplications(mockApplications);
      setFilteredApplications(mockApplications);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter Applications based on City or Country
  const filterApplications = (criteria, value) => {
    if (value) {
      setFilteredApplications(
        applications.filter((app) =>
          app[criteria].toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredApplications(applications);
    }
  };

  const handleTokenAddition = (applicationId) => {
    if (tokenNumber.trim()) {
      // Update the application with the token number (backend API call)
      alert(`Token Number ${tokenNumber} added to application ${applicationId}`);
      // Implement saving token number in the backend here.
    } else {
      alert("Please enter a valid token number.");
    }
  };

  const handleScheduleAppointment = () => {
    if (selectedApplication && selectedSlot) {
      alert(`Appointment scheduled for ${selectedApplication.name} on ${selectedSlot}`);
      // Save appointment details in the backend here.
    } else {
      alert("Please select an application and available slot.");
    }
  };

  const handleStatusChange = (status) => {
    if (selectedApplication) {
      alert(`Status updated to ${status} for ${selectedApplication.name}`);
      // Implement status update in the backend here.
    } else {
      alert("Please select an application to update the status.");
    }
  };

  return (
    <Box style={{ padding: "2rem", backgroundColor: "#f5f5f5" }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel - Full Access
      </Typography>

      {/* Application Filters */}
      <Grid container spacing={3} justifyContent="space-between">
        <Grid item xs={12} sm={6}>
          <TextField
            label="Search by City"
            fullWidth
            onChange={(e) => filterApplications("city", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Search by Country"
            fullWidth
            onChange={(e) => filterApplications("country", e.target.value)}
          />
        </Grid>
      </Grid>

      {/* Application List */}
      <Grid container spacing={3} justifyContent="center" style={{ marginTop: "2rem" }}>
        {loading ? (
          <CircularProgress />
        ) : (
          filteredApplications.map((application) => (
            <Grid item xs={12} sm={6} md={4} key={application.id}>
              <Box
                style={{
                  padding: "1rem",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                  backgroundColor: selectedApplication?.id === application.id ? "#f0f0f0" : "#fff",
                }}
                onClick={() => setSelectedApplication(application)}
              >
                <Typography variant="h5">{application.name}</Typography>
                <Typography variant="body2">Loan Category: {application.category}</Typography>
                <Typography variant="body2">Loan Amount: PKR {application.loanAmount}</Typography>
                <Typography variant="body2">Status: {application.status}</Typography>
              </Box>
            </Grid>
          ))
        )}
      </Grid>

      {/* Selected Application Details */}
      {selectedApplication && (
        <Box style={{ marginTop: "2rem", padding: "2rem", backgroundColor: "#fff" }}>
          <Typography variant="h5">Application Details for {selectedApplication.name}</Typography>
          <Typography variant="body2">Email: {selectedApplication.email}</Typography>
          <Typography variant="body2">City: {selectedApplication.city}</Typography>
          <Typography variant="body2">Country: {selectedApplication.country}</Typography>
          <Typography variant="body2">Loan Category: {selectedApplication.category}</Typography>
          <Typography variant="body2">Loan Amount: PKR {selectedApplication.loanAmount}</Typography>

          <Typography variant="h6" style={{ marginTop: "1rem" }}>Guarantors</Typography>
          {selectedApplication.guarantors.map((guarantor, index) => (
            <Box key={index} style={{ marginBottom: "1rem" }}>
              <Typography variant="body2">Name: {guarantor.name}</Typography>
              <Typography variant="body2">Email: {guarantor.email}</Typography>
              <Typography variant="body2">Location: {guarantor.location}</Typography>
              <Typography variant="body2">CNIC: {guarantor.cnic}</Typography>
            </Box>
          ))}

          {/* Token Number Addition */}
          <TextField
            label="Enter Token Number"
            fullWidth
            value={tokenNumber}
            onChange={(e) => setTokenNumber(e.target.value)}
            style={{ marginTop: "2rem" }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => handleTokenAddition(selectedApplication.id)}
            style={{ marginTop: "1rem" }}
          >
            Add Token Number
          </Button>

          {/* Appointment Scheduling */}
          <FormControl fullWidth style={{ marginTop: "2rem" }}>
            <InputLabel>Appointment Slot</InputLabel>
            <Select
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>Select Appointment Slot</MenuItem>
              {availableSlots.map((slot, index) => (
                <MenuItem key={index} value={slot}>{slot}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleScheduleAppointment}
            style={{ marginTop: "1rem" }}
          >
            Schedule Appointment
          </Button>

          {/* Status Update */}
          <Grid container spacing={2} style={{ marginTop: "1rem" }}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={() => handleStatusChange("Approved")}
              >
                Approve
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={() => handleStatusChange("Rejected")}
              >
                Reject
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default AdminPanel;
