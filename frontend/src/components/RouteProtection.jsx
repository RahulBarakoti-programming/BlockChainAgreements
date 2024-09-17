import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const verifyToken = async (token) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/verify-token`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.isValid;
  } catch (error) {
    console.error("Error during token verification:", error);
    return false;
  }
};

export const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        const valid = await verifyToken(token);
        setIsAuthenticated(valid);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkToken();
  }, [token]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export const AuthRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        const valid = await verifyToken(token);
        setIsAuthenticated(valid);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkToken();
  }, [token]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Navigate to="/" replace /> : children;
};
