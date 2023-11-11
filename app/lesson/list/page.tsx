"use client";

import { prisma } from "@/db/prisma";
import { useSession } from "next-auth/react";

export default function ListLesson() {
  const session = useSession();
  if (!session || !session.data) {
    throw new Error("Vous devez être connecté pour accéder à ce contenu");
  }
  const user = session.data.user;

  return <div>page</div>;
}
