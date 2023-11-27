import { Layout, LayoutContent } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/db/prisma";
import { getAuthSession } from "@/lib/auth";
import { LessonForm } from "./lessonForm";
import { Lesson } from "@prisma/client";
import { Typography } from "@/components/ui/Typography";

export default async function EditLessonPage({
  params,
}: {
  params: { lessonId: string; courseId: string };
}) {
  const session = await getAuthSession();
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: params.lessonId,
      courseId: params.courseId,
    },
  });
  if (!lesson) {
    throw new Error("cette leçon n'existe pas!");
  }
  return (
    <Layout>
      <LayoutContent>
        <Card>
          <CardHeader>
            <Typography variant={"h2"}>Editer lesson</Typography>
          </CardHeader>
          <CardContent>
            <LessonForm lesson={lesson} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
