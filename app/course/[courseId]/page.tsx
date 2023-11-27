import { Layout, LayoutContent } from "@/components/layout/Layout";
import { Typography } from "@/components/ui/Typography";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/db/prisma";
import { Pencil } from "lucide-react";
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
      <LayoutContent className="flex gap-3">
        <Card className="flex-[2]">
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

            <Link
              href={`/course/${params.courseId}/edit`}
              className={buttonVariants({ variant: "outline" })}
            >
              Editer
            </Link>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <Typography variant={"h2"}>Lessons</Typography>
          </CardHeader>
          <CardContent>
            <ul className="ms-3">
              {course?.lessons.map((lesson) => (
                <div key={lesson.id} className=" flex justify-between">
                  <li className="mb-2">
                    {lesson.rank} - {lesson.name}
                  </li>
                  <Link href={`/course/${params.courseId}/lesson/${lesson.id}`}>
                    <Pencil />
                  </Link>
                </div>
              ))}
            </ul>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
