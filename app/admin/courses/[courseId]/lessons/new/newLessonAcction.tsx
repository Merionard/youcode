"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { newLessonSchema } from "./newLessonSchema";
import { prisma } from "@/db/prisma";

export const newLessonAction = authenticatedAction(
  newLessonSchema,
  async (data, { userId }) => {
    const maxRank = await prisma.lesson.aggregate({
      _max: {
        rank: true,
      },
      where: { courseId: data.courseId },
    });

    await prisma.lesson.create({
      data: {
        name: data.name,
        state: data.state,
        content: data.content,
        courseId: data.courseId,
        rank: maxRank._max.rank
          ? (Number(maxRank._max.rank) + 1).toString()
          : "1",
      },
    });

    return "nouvelle leçon créée avec succès!";
  }
);
