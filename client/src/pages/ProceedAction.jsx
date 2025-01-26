import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, TextField, Box, Typography } from "@mui/material";

const ProceedAction = ({ open, onClose }) => {
  const [formData, setFormData] = useState({ CNIC: "", email: "", name: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Logic to handle form submission and navigate to the next step
    console.log(formData);
    onClose(); // Close the modal after submission
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: "2rem", backgroundColor: "white", borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Proceed with your Loan Request
        </Typography>
        <TextField
          label="CNIC"
          name="CNIC"
          value={formData.CNIC}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};
ProceedAction.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProceedAction;
