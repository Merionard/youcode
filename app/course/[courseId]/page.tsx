import { Layout, LayoutContent } from "@/components/layout/Layout";
import { Typography } from "@/components/ui/Typography";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/db/prisma";
import Link from "next/link";

export default async function Course({
  params,
}: {
  params: { courseId: string };
}) {
  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      lessons: {
        select: {
          name: true,
          id: true,
          rank: true,
        },
        orderBy: {
          rank: "desc",
        },
      },
    },
  });

  return (
    <Layout>
      <LayoutContent>
        <Card>
          <CardHeader>
            <div className="flex gap-2 content-center">
              {course?.image && (
                <Avatar>
                  <AvatarImage src={course?.image} />
                </Avatar>
              )}
              <Typography variant={"h2"}>{course?.name}</Typography>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <>
              <Typography variant={"h3"} className="underline">
                Description:
              </Typography>
              {course?.presentation}
            </>
            <>
              <Typography variant={"h3"} className="underline">
                Leçons
              </Typography>
              <ul className="ms-3">
                {course?.lessons.map((lesson) => (
                  <li key={lesson.id}>
                    {lesson.rank} - {lesson.name}
                  </li>
                ))}
              </ul>
            </>
            <Link
              href={`/course/${params.courseId}/edit`}
              className={buttonVariants({ variant: "outline" })}
            >
              Editer
            </Link>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
