"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { newCourseSchema } from "./newCourseSchema";
import { prisma } from "@/db/prisma";
import { z } from "zod";

export const submitNewCourse = authenticatedAction(
  newCourseSchema,
  async (formData) => {
    const course = await prisma.course.create({
      data: {
        image: formData.imageUrl,
        name: formData.name,
        presentation: formData.presentation,
        creatorId: formData.creatorId,
      },
    });
    return { message: "le cours a été créé avec succès!", course };
  }
);
