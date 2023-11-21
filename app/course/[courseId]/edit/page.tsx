import { Layout, LayoutContent } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/db/prisma";
import { CourseForm } from "./CourseForm";
import { Typography } from "@/components/ui/Typography";

export default async function EditCourse({
  params,
}: {
  params: { courseId: string };
}) {
  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
    },
  });
  if (!course) {
    throw new Error("Ce cours n'existe pas!");
  }

  return (
    <Layout>
      <LayoutContent>
        <Card>
          <CardHeader>
            <Typography variant={"h2"}>{course.name}</Typography>
          </CardHeader>
          <CardContent>
            <CourseForm course={course} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
