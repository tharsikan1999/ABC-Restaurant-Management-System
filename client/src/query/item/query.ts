import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AddItem } from "../../api/item/Api";

export const useAddItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AddItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AddItem"] });
    },
    onError: (error) => {
      toast.error(`Error add AddStaff : ${error.message}`);
    },
  });
};
