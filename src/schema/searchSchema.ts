import { z } from 'zod';

export const searchSchmema = z.object({
  query: z
  .string()
  .min(1, { message: "Search query cannot be empty" })
  .max(100, { message: "Search query cannot exceed 100 characters" }),
})