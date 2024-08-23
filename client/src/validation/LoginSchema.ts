import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" }),
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
  rememberMe: z.boolean().optional(),
});
