import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";

const CommonBase_API_URL = `${import.meta.env.VITE_API_URL}/item`;

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

type Item = {
  id?: string;
  name: string;
  price: number;
  isAvailable: boolean;
  user?: User;
  itemImg?: string | File;
  imagePath?: string;
};

interface AddItemProps {
  item: Item;
  image: File;
  axiosPrivate: AxiosInstance;
  reset: () => void;
  setIsOpen: (isOpen: boolean) => void;
  refetch: () => void;
}

export const AddItem = async ({
  item,
  image,
  axiosPrivate,
  reset,
  setIsOpen,
  refetch,
}: AddItemProps): Promise<void> => {
  try {
    const formData = new FormData();

    formData.append("item", JSON.stringify(item));

    formData.append("image", image);

    await axiosPrivate.post(`${CommonBase_API_URL}/addItem`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Item added successfully");
    reset();
    setIsOpen(false);
    refetch();
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

//get all Items data
export const FetchAllItemsData = async (): Promise<Item[]> => {
  try {
    const res = await axios.get(`${CommonBase_API_URL}/getAllItems`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching AllItems:", error.message);
    } else {
      console.error("Error fetching AllItems:", error);
    }
    throw new Error("Failed to get data");
  }
};
