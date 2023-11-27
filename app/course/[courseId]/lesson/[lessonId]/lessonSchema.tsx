import { LessonState } from "@prisma/client";
import { z } from "zod";

export const LessonSchema = z.object({
  name: z.string(),
  state: z.nativeEnum(LessonState),
  id: z.string().optional(),
});
