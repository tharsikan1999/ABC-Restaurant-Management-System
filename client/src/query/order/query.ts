import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { OrderItem } from "../../api/order/Api";

export const useOrderItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: OrderItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["OrderItem"] });
    },
    onError: (error) => {
      toast.error(`Error add AddStaff : ${error.message}`);
    },
  });
};
