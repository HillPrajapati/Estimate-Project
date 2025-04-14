import React from 'react';
import { Navigate } from 'react-router-dom';
import { getItem } from '../../../helper/localStorageHelper'; // Assuming you've created localStorage helper

const ProtectedRoute = ({ element: Element, isProtected=true, ...rest }) => {
  const authKey = getItem('authToken');  // Retrieve the token from localStorage

  if (isProtected) {
    // If route is protected and no authKey found, redirect to Login
    if (!authKey) {
      return <Navigate to="/" />;
    }
    // If authKey found, render the passed component (protected route)
    return <Element {...rest} />;
  }

  // For login and register routes, if authKey is found, redirect to the dashboard
  if (authKey) {
    return <Navigate to="/dashboard" />;
  }

  // If no authKey and route is not protected, render the passed component (login/register)
  return <Element {...rest} />;
};

export default ProtectedRoute;
