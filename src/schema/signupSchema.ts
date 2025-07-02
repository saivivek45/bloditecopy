import { z } from 'zod';

export const signupSchema = z.object({
  email: z
  .string({message: "Invalid Input"})
  .email({message: "Invalid email address"}),

  password: z
  .string({message: "Invalid Input"})
  .regex(/^(?=.*[A-Z])(?=.*\d).*$/, {message: "Password must have one uppercase and digit"})
  .min(8, {message: "Password should be atleast 8 characters"}),

  username: z
  .string({message: "Invalid Input"})
  .min(2, {message: "Username should be atleast 2 characters"})
})