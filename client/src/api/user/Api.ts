import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";

const CommonBase_API_URL = `${import.meta.env.VITE_API_URL}/user`;

type Staff = {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
};

interface AddStaffProps {
  staff: Staff;
  axiosPrivate: AxiosInstance;
  reset: () => void;
  setIsOpen: (isOpen: boolean) => void;
  refetch?: () => void;
}

//add a staff
export const AddStaff = async ({
  staff,
  axiosPrivate,
  reset,
  setIsOpen,
  refetch,
}: AddStaffProps): Promise<void> => {
  try {
    await axiosPrivate.post(`${CommonBase_API_URL}/addStaff`, staff);
    toast.success("Staff added successfully");
    reset();
    setIsOpen(false);
    if (refetch) {
      refetch();
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (
        error.response.status === 409 &&
        error.response.data.message === "User already exists"
      ) {
        toast.error("Staff already exists");
      }
    } else {
      toast.error("Add staff failed");
    }
  }
};

//get all Students data
export const FetchAllStaffData = async (
  axiosPrivate: AxiosInstance
): Promise<Staff[]> => {
  try {
    const res = await axiosPrivate.get(`${CommonBase_API_URL}/getStaff`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching student data:", error.message);
    } else {
      console.error("Error fetching student data:", error);
    }
    throw new Error("Failed to get data");
  }
};
