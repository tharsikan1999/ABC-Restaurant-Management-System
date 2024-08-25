import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { SendEmail } from "../../api/email/Api";

export const useSendMailMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SendEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["SendEmail"] });
    },
    onError: (error) => {
      toast.error(`Error Send Email : ${error.message}`);
    },
  });
};
