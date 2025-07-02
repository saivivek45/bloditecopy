import { z } from 'zod';

export const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().min(1, "Description is required").max(200, "Description must be less than 200 characters"),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().url("Please enter a valid URL").min(1, "Image URL is required"),
  content: z.string().min(1, "Blog pitch is required").max(1000, "Blog pitch must be at least 1000 characters"),
})