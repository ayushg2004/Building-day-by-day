/* IMP Protect /home route  we are using ProtectedRoute component in this home route special as we not want to access users to acess home page without logging in  to protect the /home route from unauthenticated users as some users may try to access the /home route without logging in by adding path in url /home like this */

// RISK LENE KA HI NHI!!!!

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, allow access
  return children;
};

export default ProtectedRoute;
