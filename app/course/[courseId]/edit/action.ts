"use server";

import { z } from "zod";
import { prisma } from "@/db/prisma";
import { authenticatedAction } from "@/lib/safe-action";
import { formSchema } from "./courseSchema";

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

export const safeSubmitCourseForm = authenticatedAction(
  formSchema,
  async (data) => {
    await prisma.course.update({
      where: { id: data.courseId },
      data: {
        image: data.imageUrl,
        name: data.name,
        presentation: data.presentation,
      },
    });
    return "Cours mis à jour avec succès!";
  }
);
