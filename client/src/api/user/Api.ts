import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";

const CommonBase_API_URL = `${import.meta.env.VITE_API_URL}/user`;

type Staff = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

interface AddStaffProps {
  staff: Staff;
  axiosPrivate: AxiosInstance;
  reset: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

//add a staff
export const AddStaff = async ({
  staff,
  axiosPrivate,
  reset,
  setIsOpen,
}: AddStaffProps): Promise<void> => {
  try {
    await axiosPrivate.post(`${CommonBase_API_URL}/addStaff`, staff);
    toast.success("Staff added successfully");
    reset();
    setIsOpen(false);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (
        error.response.status === 409 &&
        error.response.data.message === "User already exists"
      ) {
        toast.error("User already exists");
      }
    } else {
      toast.error("Add staff failed");
    }
  }
};
