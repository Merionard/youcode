import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import Link from "next/link";

export default async function CoursesPage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Admin</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Link href="/admin/courses">Mes cours</Link>
      </LayoutContent>
    </Layout>
  );
}
