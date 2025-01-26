import { useState } from "react";
import PropTypes from "prop-types";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";

const ProceedPopup = ({ open, onClose, onSubmit }) => {
  const [cnic, setCnic] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    onSubmit({ cnic, email, name });
    onClose();  // Close the popup after submitting
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Proceed with Application</DialogTitle>
      <DialogContent>
        <TextField
          label="CNIC"
          value={cnic}
          onChange={(e) => setCnic(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};
ProceedPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ProceedPopup;
