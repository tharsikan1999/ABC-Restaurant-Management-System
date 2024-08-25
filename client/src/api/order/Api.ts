import { AxiosInstance } from "axios";
import { toast } from "react-toastify";

const CommonBase_API_URL = `${import.meta.env.VITE_API_URL}/order`;

type Order = {
  userId: number;
  itemId: number;
  address: string;
};

interface OrderItemProps {
  order: Order;
  axiosPrivate: AxiosInstance;
  reset: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

//add a Item
export const OrderItem = async ({
  order,
  axiosPrivate,
  reset,
  setIsOpen,
}: OrderItemProps): Promise<void> => {
  try {
    await axiosPrivate.post(`${CommonBase_API_URL}/placeOrder`, order);
    toast.success("Order placed successfully");
    reset();
    setIsOpen(false);
  } catch (error) {
    toast.error("Order failed");
    console.log(error);
  }
};
