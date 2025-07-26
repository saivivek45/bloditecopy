import { z } from 'zod';

export const updateProfileSchema = z.object({
  email: z
  .string({message: "Invalid Input"})
  .email({message: "Invalid email address"}),

  name: z
  .string({message: "Invalid Input"})
  .min(1, {message: "Name is required"})
})