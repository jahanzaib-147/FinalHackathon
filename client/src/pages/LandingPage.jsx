import  { useState } from 'react';
import { Grid, Card, CardContent, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const [deposit, setDeposit] = useState('');
  const [loanPeriod, setLoanPeriod] = useState('');
  const [category, setCategory] = useState('Wedding Loans');
  const [estimatedLoan, setEstimatedLoan] = useState(null);

  const loanCategories = [
    {
      name: 'Wedding Loans',
      subcategories: ['Valima', 'Furniture', 'Valima Food', 'Jahez'],
    },
    {
      name: 'Home Construction Loans',
      subcategories: ['Structure', 'Finishing', 'Loan'],
    },
    {
      name: 'Business Startup Loans',
      subcategories: ['Buy Stall', 'Advance Rent for Shop', 'Shop Assets', 'Shop Machinery'],
    },
    {
      name: 'Education Loans',
      subcategories: ['University Fees', 'Child Fees Loan'],
    },
  ];

  const handleLoanCalculation = () => {
    const loanAmount = parseInt(deposit) * 2; // Simple loan calculation formula
    setEstimatedLoan(loanAmount);
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#1e1e1e', minHeight: '100vh' }}>
      <Typography variant="h3" color="primary" align="center" gutterBottom>
        Microfinance Loan Portal
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* Loan Categories */}
        {[
          {
            name: 'Wedding Loans',
            description: 'Valima, Furniture, Jahez',
            maxLoan: 'PKR 5 Lakh',
            loanPeriod: '3 years',
          },
          {
            name: 'Home Construction Loans',
            description: 'Structure, Finishing, Loan',
            maxLoan: 'PKR 10 Lakh',
            loanPeriod: '5 years',
          },
          {
            name: 'Business Startup Loans',
            description: 'Shop Machinery, Rent, Assets',
            maxLoan: 'PKR 10 Lakh',
            loanPeriod: '5 years',
          },
          {
            name: 'Education Loans',
            description: 'University, Child Fees',
            maxLoan: 'Based on Requirement',
            loanPeriod: '4 years',
          },
        ].map((category, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card style={{ cursor: 'pointer' }} onClick={() => navigate('/loan-request')}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {category.name}
                </Typography>
                <Typography variant="body2">Maximum Loan: {category.maxLoan}</Typography>
                <Typography variant="body2">Loan Period: {category.loanPeriod}</Typography>
                <Typography variant="body2">Subcategories: {category.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* New Slip Generator Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card style={{ cursor: 'pointer', backgroundColor: '#333', color: 'white' }} onClick={() => navigate('/slip-generation')}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Generate Loan Slip
              </Typography>
              <Typography variant="body2">Click here to generate a loan slip after submitting your request.</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Loan Calculator Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Card style={{ backgroundColor: '#333', color: 'white' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Loan Calculator
              </Typography>
              <FormControl fullWidth margin="normal">
                <InputLabel>Loan Category</InputLabel>
                <Select value={category} onChange={(e) => setCategory(e.target.value)} label="Loan Category">
                  {loanCategories.map((cat, index) => (
                    <MenuItem key={index} value={cat.name}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Initial Deposit"
                fullWidth
                margin="normal"
                type="number"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
              />
              <TextField
                label="Loan Period (years)"
                fullWidth
                margin="normal"
                type="number"
                value={loanPeriod}
                onChange={(e) => setLoanPeriod(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleLoanCalculation}
              >
                Calculate Loan
              </Button>
              {estimatedLoan && (
                <Typography variant="body1" color="secondary" align="center" sx={{ mt: 2 }}>
                  Estimated Loan Amount: PKR {estimatedLoan}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default LandingPage;
