"use server";

import { z } from "zod";
import { formSchema } from "./CourseForm";
import { prisma } from "@/db/prisma";

export async function submitCourseForm(
  data: z.infer<typeof formSchema>,
  courseId: string
) {
  await prisma.course.update({
    where: { id: courseId },
    data: {
      image: data.imageUrl,
      name: data.name,
      presentation: data.presentation,
    },
  });
}
