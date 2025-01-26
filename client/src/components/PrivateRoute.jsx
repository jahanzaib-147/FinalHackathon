import { Navigate, Outlet } from "react-router-dom";
import PropTypes from 'prop-types';

const PrivateRoute = ({ isAdmin }) => {
  const token = localStorage.getItem("token");  // Assuming token is saved in localStorage

  // Check if user is authenticated
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Check if user is an admin when accessing admin routes
  if (isAdmin && !JSON.parse(localStorage.getItem("isAdmin"))) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};
PrivateRoute.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default PrivateRoute;
