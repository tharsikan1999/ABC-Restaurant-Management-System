import * as z from "zod";

export const ContactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .refine((val) => val.trim().length > 0, {
      message: "Name is required",
    }),
  email: z
    .string()
    .email("Invalid email address")
    .refine((val) => val.trim().length > 0, {
      message: "Invalid email address",
    }),
  subject: z
    .string()
    .min(1, "Subject is required")
    .refine((val) => val.trim().length > 0, {
      message: "Subject is required",
    }),
  message: z
    .string()
    .min(1, "Message is required")
    .refine((val) => val.trim().length > 0, {
      message: "Message is required",
    }),
});
