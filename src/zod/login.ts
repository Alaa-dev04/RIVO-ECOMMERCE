import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";
export const LoginSchema = z.object({
  email: z
    .string({ error: "Email is required." })
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  password: z
    .string({ error: "Password is required." })
    .min(8, "Password must be at least 8 characters."),

  phone: z
    .string()
    .min(1, "Phone number is required.")
    .refine(isValidPhoneNumber, {
      message: "Please enter a valid phone number.",
    }),

  rememberMe: z.boolean({ error: "Remember me is required." }).default(false),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
