"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { LessonSchema } from "./lessonSchema";
import { prisma } from "@/db/prisma";

export const editLesson = authenticatedAction(LessonSchema, async (data) => {
  console.log(data);
  if (data.id) {
    console.log(data);
    await prisma.lesson.update({
      where: {
        id: data.id,
      },
      data: { name: data.name, state: data.state },
    });
    return "mise à jour de la leçon effectuée avec succès!";
  }
});
