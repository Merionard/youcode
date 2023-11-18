import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import Link from "next/link";
import { selectCourseById } from "../query";
import { PaginationButton } from "@/components/features/pagination/paginationButton";

export default async function Lesson({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getRequiredAuthSession();
  const page = Number(searchParams.page ?? 1);
  const course = await selectCourseById(params.id, session.user.id, page);

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>{course?.name}</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <div className="flex gap-4 flex-col lg:flex-row">
          <Card className="flex-[2]">
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {course?.users.map((user) => (
                    <TableRow key={user.user.id}>
                      <TableCell>
                        <Avatar className="rounded">
                          {user.user.image && (
                            <AvatarImage
                              src={user.user.image}
                              alt={user.user.name ?? "test"}
                            />
                          )}
                        </Avatar>
                      </TableCell>
                      <TableCell>{user.user.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <PaginationButton baseUrl={`/course/${params.id}`} page={page} />
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                <Avatar className="rounded">
                  {course?.image && (
                    <AvatarImage
                      src={course?.image}
                      alt={course.name ?? "test"}
                    />
                  )}
                </Avatar>
                <p>{course?.name}</p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{course?._count.users} utilisateurs</p>
              <p>{course?._count.lessons} leçons</p>
              <p style={{ whiteSpace: "nowrap" }}>
                Date de création: {course?.createdAt.toLocaleDateString()}
              </p>
              <div className="flex flex-col gap-2 mt-2">
                <Link
                  href={`/course/${params.id}/edit`}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Editer
                </Link>
                <Link
                  href={`/course/${params.id}/edit`}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Editer leçons
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </LayoutContent>
    </Layout>
  );
}
