import { prisma } from "@/db/prisma";
import { fetchUserLessionByIdUser } from "@/db/userRepository";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) return;
  const lessons = await fetchUserLessionByIdUser(userId);
  console.log(lessons);
  return Response.json({ lessons });
}
