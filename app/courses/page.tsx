import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { Typography } from "@/components/ui/Typography";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/db/prisma";
import Link from "next/link";

export default async function CoursesList() {
  const courses = await prisma.course.findMany();

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Liste des cours disponibles</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="grid grid-cols-2 gap-4">
        {courses.map((course) => (
          <Link key={course.id} href={`course/${course.id}`}>
            <Card className="h-full p-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
              <CardHeader>
                <CardTitle className="flex gap-2 items-center">
                  <Avatar className="rounded">
                    {course.image && (
                      <AvatarImage src={course.image} alt={course.name} />
                    )}
                  </Avatar>
                  <Typography variant={"large"}>{course.name}</Typography>
                </CardTitle>
              </CardHeader>
              <CardDescription>{course.presentation}</CardDescription>
            </Card>
          </Link>
        ))}
      </LayoutContent>
    </Layout>
  );
}
