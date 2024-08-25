import { AxiosInstance } from "axios";
import { toast } from "react-toastify";

const CommonBase_API_URL = `${import.meta.env.VITE_API_URL}`;

type ContactInfo = {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
};

interface AddItemProps {
  contactInfo: ContactInfo;
  axiosPrivate: AxiosInstance;
  reset: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

//add a Item
export const SendEmail = async ({
  contactInfo,
  axiosPrivate,
  reset,
  setIsOpen,
}: AddItemProps): Promise<void> => {
  try {
    await axiosPrivate.post(`${CommonBase_API_URL}/send-email`, contactInfo);
    toast.success("Email sent successfully");
    reset();
    setIsOpen(false);
  } catch (error) {
    console.log(error);
    toast.error("Send Email failed");
  }
};
