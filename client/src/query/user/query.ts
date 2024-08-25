import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AddStaff } from "../../api/user/Api";

export const useAddStaffMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AddStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AddStaff"] });
    },
    onError: (error) => {
      toast.error(`Error add AddStaff : ${error.message}`);
    },
  });
};
