import { Layout, LayoutContent } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { prisma } from "@/db/prisma";
import { getAuthSession } from "@/lib/auth";
import { LessonForm } from "./lessonForm";
import { Lesson } from "@prisma/client";

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
          <CardHeader>{lesson?.name}</CardHeader>
          <CardContent>
            <LessonForm lesson={lesson} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
