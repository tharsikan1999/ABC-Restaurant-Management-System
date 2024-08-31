import * as z from "zod";

export const AddItemSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(255),
  price: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Price must be a number",
    })
    .transform((val) => Number(val))
    .refine((val) => val > 0, { message: "Price is required" }),
  isAvailable: z.string().min(1, { message: "Availability is required" }),
});
