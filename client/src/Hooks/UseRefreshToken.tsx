import axios, { AxiosResponse } from "axios";
import UseAuthProvider from "@/Hooks/UseAuthProvider";
import useUserStore from "@/store/userDetailsSlice";

interface TokenRenewalResponse {
  valid: boolean;
  message: string;
  newAccessToken: string;
}

const useRefreshToken = () => {
  const { setAuth } = UseAuthProvider();
  const currentUser = useUserStore((state) => state.currentUser);

  const refresh = async (): Promise<string | null> => {
    if (!currentUser) {
      return null;
    }
    try {
      const response: AxiosResponse<TokenRenewalResponse> = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/renew/token`,
        { sessionId: currentUser.sessionId },
        {
          withCredentials: true,
        }
      );

      if (
        response.data.valid === true &&
        response.data.message === "Access token renewed"
      ) {
        setAuth((prev) => {
          return { ...prev, accessToken: response.data.newAccessToken };
        });

        return response.data.newAccessToken;
      }
      return null;
    } catch (error) {
      return null;
    }
  };
  return refresh;
};

export default useRefreshToken;
