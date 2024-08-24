import * as z from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }).max(255),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phone: z
      .string()
      .length(10, { message: "Phone Number must be exactly 10 digits" })
      .regex(/^\d+$/, { message: "Phone Number must be numeric" }),
    password: z
      .string()
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one numeric digit",
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      })
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
