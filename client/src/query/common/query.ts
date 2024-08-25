import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Logout } from "../../api/common/Api";

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Logout"] });
    },
    onError: (error) => {
      toast.error(`Error logging out: ${error.message}`);
    },
  });
};
