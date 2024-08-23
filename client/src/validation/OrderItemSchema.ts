import * as z from "zod";

export const OrderItemSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(255),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .max(10, { message: "Phone Number must be 10 digits" })
    .refine((val) => !isNaN(Number(val)), {
      message: "Phone Number must be a number",
    })
    .transform((val) => Number(val))
    .refine((val) => val > 0, { message: "Phone Number is required" }),
  address: z
    .string()
    .min(1, "Address is required")
    .refine((val) => val.trim().length > 0, {
      message: "Address is required",
    }),
});
