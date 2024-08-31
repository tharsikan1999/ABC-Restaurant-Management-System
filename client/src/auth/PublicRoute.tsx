import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import useRefreshToken from "../Hooks/UseRefreshToken";
import UseAuthProvider from "../Hooks/UseAuthProvider";
import { decodeToken } from "../utils/JwtDecode";

interface PublicRouteProps {
  element: React.ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
  const { auth, setAuth } = UseAuthProvider();
  const refresh = useRefreshToken();
  const [isLoading, setIsLoading] = useState(true);

  const checkTokenValidity = async () => {
    if (auth?.accessToken) {
      const decodedToken = jwtDecode<{ exp: number }>(auth.accessToken);
      const isExpired = decodedToken.exp * 1000 < Date.now();
      if (!isExpired) {
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
    } else {
      setAuth({
        ...auth,
        accessToken: "",
        role: "",
        userId: 0,
        email: "",
        phone: "",
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkTokenValidity();
  }, [auth, refresh, setAuth]);

  if (isLoading) {
    return null;
  }
  return element;
};

export default PublicRoute;
