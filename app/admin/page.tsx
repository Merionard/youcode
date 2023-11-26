import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default async function CoursesPage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Admin</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardContent>
            <Link href="/admin/courses" className="mr-3">
              Mes cours
            </Link>
            <Link href="/admin/course/new">Créer un cours</Link>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
