import axios from "axios";
import { toast } from "react-toastify";

const CommonBase_API_URL = `${import.meta.env.VITE_API_URL}/user`;

// logout
export const Logout = async (): Promise<void> => {
  try {
    const res = await axios.post(`${CommonBase_API_URL}/logout`);

    if (res.status === 200) {
      toast.success("Logged out successfully");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status } = error.response;

      if (status === 401) {
        toast.error("Unauthorized");
      } else {
        toast.error("Failed to logout. Please try again.");
      }
    } else {
      toast.error("Failed to update password. Please try again.");
    }
  }
};
