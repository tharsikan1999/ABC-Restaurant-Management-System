import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useRefreshToken from "../Hooks/UseRefreshToken";
import UseAuthProvider from "../Hooks/UseAuthProvider";
import { decodeToken } from "../utils/JwtDecode";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { auth, setAuth } = UseAuthProvider();
  const location = useLocation();
  const refresh = useRefreshToken();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkTokenValidity = async () => {
    if (auth?.accessToken) {
      const decodedToken = jwtDecode<{ exp: number }>(auth.accessToken);
      const isExpired = decodedToken.exp * 1000 < Date.now();
      if (!isExpired) {
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }
    }
    const newToken = await refresh();
    if (newToken) {
      const decodeJwt = decodeToken(newToken);
      setAuth({
        ...auth,
        accessToken: newToken,
        role: decodeJwt.role,
        userId: decodeJwt.id,
        email: decodeJwt.email,
        phone: decodeJwt.phone,
        userDbId: decodeJwt.id,
      });
      setIsAuthenticated(true);
    } else {
      setAuth({
        ...auth,
        accessToken: "",
        role: "",
        userId: 0,
        email: "",
        phone: "",
      });
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkTokenValidity();
  }, [auth, refresh, setAuth]);

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return element;
};

export default ProtectedRoute;
