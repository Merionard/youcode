"use client";

import { useSession } from "next-auth/react";
import { Typography } from "../ui/Typography";
import Link from "next/link";

export const Menu = () => {
  const { data: session } = useSession();
  if (!session) {
    <div className="flex flex-1 items-center gap-5 justify-center">
      <Typography as={Link} variant={"link"} href={"/courses"}>
        Explorer
      </Typography>
      ;
    </div>;
  }
  return (
    <div className="flex flex-1 items-center gap-5 justify-center">
      <Typography as={Link} variant={"link"} href={"/courses"}>
        Explorer
      </Typography>
      <Typography as={Link} variant={"link"} href={"/myCourses"}>
        Mes cours
      </Typography>
    </div>
  );
};
