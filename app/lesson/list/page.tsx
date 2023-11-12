import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchUserLessionByIdUser } from "@/db/userRepository";
import { getRequiredAuthSession } from "@/lib/auth";
import Link from "next/link";

export default async function ListLesson() {
  const session = await getRequiredAuthSession();
  const lessons = await fetchUserLessionByIdUser(session.user.id);
  return (
    <div className="flex gap-3 justify-center mt-5 ">
      {lessons.map((lesson) => (
        <Link key={lesson.name} href={`/lesson/${lesson.id}`}>
          <Card className="flex-grow">
            <CardHeader>
              <CardTitle>{lesson.name}</CardTitle>
              <CardContent>{lesson.description}</CardContent>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
