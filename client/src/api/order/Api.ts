import { AxiosInstance } from "axios";
import { toast } from "react-toastify";

const CommonBase_API_URL = `${import.meta.env.VITE_API_URL}/order`;

interface Item {
  name: string;
  price: number;
}

interface User {
  name: string;
  email: string;
  phone: string;
}

interface Order {
  item: Item;
  address: string;
  orderDate: string;
  user: User;
}

interface userOrder {
  userId: string;
  itemId: string;
  address: string;
}

interface OrderItemProps {
  order: userOrder;
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

//get all Items data
export const FetchAllOrderItemData = async (
  axiosPrivate: AxiosInstance
): Promise<Order[]> => {
  try {
    const res = await axiosPrivate.get(`${CommonBase_API_URL}/getAllOrders`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching get All Orders:", error.message);
    } else {
      console.error("Error fetching get All Orders:", error);
    }
    throw new Error("Failed to get data");
  }
};

export const FetchAllOrderByUserId = async (
  axiosPrivate: AxiosInstance,
  userId: number
): Promise<Order[]> => {
  try {
    const res = await axiosPrivate.get(
      `${CommonBase_API_URL}/getOrdersByUserId/${userId}`
    );
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching get All Orders:", error.message);
    } else {
      console.error("Error fetching get All Orders:", error);
    }
    throw new Error("Failed to get data");
  }
};
