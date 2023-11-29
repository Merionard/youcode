import { z } from "zod";
import { LessonSchema } from "../../../../../course/[courseId]/lesson/[lessonId]/lessonSchema";

export const newLessonSchema = LessonSchema.extend({
  content: z.string().min(10).max(1000),
  courseId: z.string().min(1),
});
