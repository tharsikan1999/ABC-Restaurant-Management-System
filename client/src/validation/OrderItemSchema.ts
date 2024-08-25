import * as z from "zod";

export const OrderItemSchema = z.object({
  address: z
    .string()
    .min(1, "Address is required")
    .refine((val) => val.trim().length > 0, {
      message: "Address is required",
    }),
});
