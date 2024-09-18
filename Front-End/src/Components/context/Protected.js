import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('user') || localStorage.getItem('admin') || localStorage.getItem('transporter');

  return isLoggedIn ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
