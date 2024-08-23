import * as z from "zod";

export const RegisterSchema = z
  .object({
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
