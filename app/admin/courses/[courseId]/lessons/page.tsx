import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/db/prisma";
import React from "react";

export default async function Lessons({
  params,
}: {
  params: { courseId: string };
}) {
  const lessons = await prisma.lesson.findMany({
    where: {
      courseId: params.courseId,
    },
  });

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Liste des leçons</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>nom</TableHead>
                  <TableHead>statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lessons.map((lesson) => (
                  <TableRow key={lesson.id}>
                    <TableCell>{lesson.name}</TableCell>
                    <TableCell>{lesson.state}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
