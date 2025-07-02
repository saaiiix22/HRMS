import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [tokenExists, setTokenExists] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.removeItem('token');
      setTokenExists(false);
    }, 3600000); 

    return () => clearInterval(interval); 
  }, []);

  if (!tokenExists) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
