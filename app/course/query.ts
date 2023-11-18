import { prisma } from "@/db/prisma";

export const selectCourseById = async (
  courseId: string,
  userId: string,
  page: number
) => {
  const course = await prisma.course.findUnique({
    where: { id: courseId, creatorId: userId },
    include: {
      _count: {
        select: { users: true, lessons: true },
      },
      users: {
        skip: page > 1 ? (page - 1) * 5 : 0,
        take: 5,
        select: {
          user: { select: { name: true, email: true, image: true, id: true } },
        },
      },
    },
  });
  return course;
};
