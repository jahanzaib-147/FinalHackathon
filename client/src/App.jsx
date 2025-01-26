import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import LoanRequestPage from "./pages/LoanRequestPage";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import SlipGeneration from "./pages/SlipGeneration";
import AccountCreationPage from "./pages/AccountCreationPage";
import ProceedPopup from "./components/ProceedPopup";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";  // Correct import here

const App = () => {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin")) || false;  // Check if user is admin
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account-creation" element={<AccountCreationPage />} />
        <Route path="/loan-request" element={<LoanRequestPage />} />
              <Route path="/loan-request" element={<LoanRequestPage />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute isAdmin={isAdmin} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/slip-generation" element={<SlipGeneration />} />
          <Route path="/proceed" element={<ProceedPopup />} />
          
          {/* Admin Only Route */}
          {isAdmin && <Route path="/admin" element={<AdminPanel />} />}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
