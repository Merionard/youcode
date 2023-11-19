import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/db/prisma";
import { getRequiredAuthSession } from "@/lib/auth";

export default async function MyCourses() {
  const session = await getRequiredAuthSession();
  const data = await prisma.courseOnUser.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      course: {
        select: {
          id: true,
          creator: true,
          image: true,
          name: true,
          presentation: true,
        },
      },
    },
  });

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Mes cours</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Auteur</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="flex gap-1 content-center">
                  <Avatar className="rounded">
                    {course.course.image && (
                      <AvatarImage
                        src={course.course.image}
                        alt={course.course.name ?? "test"}
                      />
                    )}
                  </Avatar>
                  {course.course.name}
                </TableCell>
                <TableCell>{course.course.creator.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </LayoutContent>
    </Layout>
  );
}
