import axios, { AxiosResponse } from "axios";
import UseAuthProvider from "../Hooks/UseAuthProvider";
import useUserStore from "../store/userDetailsSlice";
import Cookies from "universal-cookie";

interface TokenRenewalResponse {
  message: string;
  accessToken: string;
}

const useRefreshToken = () => {
  const { setAuth } = UseAuthProvider();
  const currentUser = useUserStore((state) => state.currentUser);
  const cookies = new Cookies();

  const authToken = cookies.get("authToken");

  const refresh = async (): Promise<string | null> => {
    if (!currentUser) {
      return null;
    }
    try {
      const response: AxiosResponse<TokenRenewalResponse> = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/refreshToken`,
        {
          token: authToken,
        },
        {
          withCredentials: true,
        }
      );

      if (
        response.status === 200 &&
        response.data.message === "Refresh Token Generated Successfully"
      ) {
        setAuth((prev) => {
          return { ...prev, accessToken: response.data.accessToken };
        });

        return response.data.accessToken;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  return refresh;
};

export default useRefreshToken;
