import { z } from "zod";
import { formSchema } from "../../../course/[courseId]/edit/courseSchema";

export const newCourseSchema = formSchema
  .omit({ courseId: true })
  .extend({ creatorId: z.string() });
