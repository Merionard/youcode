import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/db/prisma";

export default async function Lesson({ params }: { params: { id: string } }) {
  const lesson = await prisma.course.findUnique({
    where: { id: params.id },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>{lesson?.name}</CardTitle>
        <CardContent></CardContent>
      </CardHeader>
    </Card>
  );
}
