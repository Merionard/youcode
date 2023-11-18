// src/components/layout/Header.tsx

import Link from "next/link";
import { ThemeToggle } from "../theme/ThemeToggle";
import { Typography } from "../ui/Typography";
import { SiteConfig } from "@/lib/site-config";
import { Button } from "../ui/button";
import { Authentication } from "../auth/authentication";

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex flex1 items-center">
          <Typography variant="h3" as={Link} href="/">
            {SiteConfig.title}
          </Typography>
        </div>
        <div className="flex flex-1 items-center gap-5 justify-center">
          <Typography as={Link} variant={"link"} href={"/courses"}>
            Les cours
          </Typography>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Authentication />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
