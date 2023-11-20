import { LogOutButton } from "@/components/auth/LogOutButton";
import { Layout, LayoutContent } from "@/components/layout/Layout";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import Link from "next/link";

export default async function MyAccount() {
  const session = await getRequiredAuthSession();
  const user = session.user;
  return (
    <Layout>
      <LayoutContent>
        <Card>
          <CardHeader className="flex flex-row gap-4 items-center">
            {user && user.image && (
              <Avatar>
                <AvatarImage src={user?.image} />
              </Avatar>
            )}
            <div style={{ margin: 0 }}>
              <div>email: {user?.email}</div>
              <div>nom: {user?.name}</div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Link
              className={buttonVariants({ variant: "outline", size: "lg" })}
              href="/myAccount/edit"
            >
              Settings
            </Link>
            <Link
              className={buttonVariants({ variant: "outline", size: "lg" })}
              href="/admin"
            >
              Admin
            </Link>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Link
              className={buttonVariants({ variant: "outline", size: "lg" })}
              href="/"
            >
              Annuler
            </Link>
            <LogOutButton />
          </CardFooter>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
