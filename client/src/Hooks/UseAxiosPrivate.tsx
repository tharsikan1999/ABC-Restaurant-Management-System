import { useEffect } from "react";
import useRefreshToken from "../Hooks/UseRefreshToken";
import UseAuthProvider from "../Hooks/UseAuthProvider";
import axiosPrivate from "../api/Axios";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = UseAuthProvider();

  useEffect(() => {
    if (!auth) {
      console.error("Auth context is missing");
      return;
    }

    const requestIntercept = axiosPrivate.interceptors.request.use(
      async (config) => {
        const currentTime = Date.now();
        const tokenExpiry = 300000;

        if (tokenExpiry && tokenExpiry - currentTime < 300000) {
          const newAccessToken = await refresh();

          config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        } else if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            const newAccessToken = await refresh();
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest);
          } catch (refreshError) {
            console.error("Token refresh error:", refreshError);
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
