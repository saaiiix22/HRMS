import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('token')
    return token?children:<Navigate to='/login' replace/>

    
    // const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
    // const [loading, setLoading] = useState(true);
  
    // useEffect (() => {
    //   const checkAuth = async () => {
    //     try {
    //       await specificUserInfo(); // Uses cookie automatically via `withCredentials`
    //       setIsAuthenticated(true);
    //     } catch (error) {
    //       setIsAuthenticated(false);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
  
    //   checkAuth();
    // }, []);
  
    // if (loading) return <div className="text-white text-center p-4">Checking authentication...</div>;
  
    // return isAuthenticated ? children : <Navigate to="/login" replace />;
  };
  

export default ProtectedRoute