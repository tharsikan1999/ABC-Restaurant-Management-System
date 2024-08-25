import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";

const CommonBase_API_URL = `${import.meta.env.VITE_API_URL}/item`;

type Item = {
  id?: string;
  name: string;
  price: number;
};

interface AddItemProps {
  item: Item;
  axiosPrivate: AxiosInstance;
  reset: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

//add a Item
export const AddItem = async ({
  item,
  axiosPrivate,
  reset,
  setIsOpen,
}: AddItemProps): Promise<void> => {
  try {
    await axiosPrivate.post(`${CommonBase_API_URL}/addItem`, item);
    toast.success("Item added successfully");
    reset();
    setIsOpen(false);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (
        error.response.status === 409 &&
        error.response.data.message === "User already exists"
      ) {
        toast.error("Item already exists");
      }
    } else {
      toast.error("Add Item failed");
    }
  }
};
