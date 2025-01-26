import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoanRequestPage = () => {
  const [guarantor1, setGuarantor1] = useState({ name: "", email: "", location: "", cnic: "" });
  const [guarantor2, setGuarantor2] = useState({ name: "", email: "", location: "", cnic: "" });
  const [personalInfo, setPersonalInfo] = useState({ address: "", phone: "" });

  const navigate = useNavigate();
  
    const handleSubmit = () => {
      alert("Loan Request Submitted Successfully!");
      navigate('/slip-generation');
    };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#1e1e1e' }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Loan Request Submission
      </Typography>

      <TextField
        label="Guarantor 1 Name"
        fullWidth
        margin="normal"
        value={guarantor1.name}
        onChange={(e) => setGuarantor1({ ...guarantor1, name: e.target.value })}
        sx={{ backgroundColor: '#333', borderRadius: 1 }}
      />
      <TextField
        label="Guarantor 1 Email"
        fullWidth
        margin="normal"
        value={guarantor1.email}
        onChange={(e) => setGuarantor1({ ...guarantor1, email: e.target.value })}
        sx={{ backgroundColor: '#333', borderRadius: 1 }}
      />
      <TextField
        label="Guarantor 1 Location"
        fullWidth
        margin="normal"
        value={guarantor1.location}
        onChange={(e) => setGuarantor1({ ...guarantor1, location: e.target.value })}
        sx={{ backgroundColor: '#333', borderRadius: 1 }}
      />
      <TextField
        label="Guarantor 1 CNIC"
        fullWidth
        margin="normal"
        value={guarantor1.cnic}
        onChange={(e) => setGuarantor1({ ...guarantor1, cnic: e.target.value })}
        sx={{ backgroundColor: '#333', borderRadius: 1 }}
      />

      <TextField
        label="Guarantor 2 Name"
        fullWidth
        margin="normal"
        value={guarantor2.name}
        onChange={(e) => setGuarantor2({ ...guarantor2, name: e.target.value })}
        sx={{ backgroundColor: '#333', borderRadius: 1 }}
      />
      <TextField
        label="Guarantor 2 Email"
        fullWidth
        margin="normal"
        value={guarantor2.email}
        onChange={(e) => setGuarantor2({ ...guarantor2, email: e.target.value })}
        sx={{ backgroundColor: '#333', borderRadius: 1 }}
      />
      <TextField
        label="Guarantor 2 Location"
        fullWidth
        margin="normal"
        value={guarantor2.location}
        onChange={(e) => setGuarantor2({ ...guarantor2, location: e.target.value })}
        sx={{ backgroundColor: '#333', borderRadius: 1 }}
      />
      <TextField
        label="Guarantor 2 CNIC"
        fullWidth
        margin="normal"
        value={guarantor2.cnic}
        onChange={(e) => setGuarantor2({ ...guarantor2, cnic: e.target.value })}
        sx={{ backgroundColor: '#333', borderRadius: 1 }}
      />

      <TextField
        label="Personal Address"
        fullWidth
        margin="normal"
        value={personalInfo.address}
        onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
        sx={{ backgroundColor: '#333', borderRadius: 1 }}
      />
      <TextField
        label="Personal Phone"
        fullWidth
        margin="normal"
        value={personalInfo.phone}
        onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
        sx={{ backgroundColor: '#333', borderRadius: 1 }}
      />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleSubmit}
        >
          Submit Request
        </Button>
      </Box>
    );
  
  };

export default LoanRequestPage;
