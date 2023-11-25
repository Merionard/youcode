import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2).max(30),
  presentation: z.string().min(10).max(50),
  imageUrl: z.string().url(),
  courseId: z.string(),
});
