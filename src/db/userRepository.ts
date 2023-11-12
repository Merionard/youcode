import { prisma } from "@/db/prisma";

export async function fetchUserLessionByIdUser(userId: string) {
  return await prisma.lesson.findMany({
    where: {
      userId: userId,
    },
    select: {
      image: true,
      description: true,
      name: true,
      userId: true,
      id: true,
    },
  });
}
