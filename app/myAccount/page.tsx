"use client";
import { LogOutButton } from "@/components/auth/LogOutButton";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";

export default function MyAccount() {
  const session = useSession();
  const user = session.data?.user;
  return (
    <Card className="max-w-lg m-auto mt-2">
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
      <CardContent>
        <div>
          <div className="flex flex-col w-full gap-2">
            <Button>Settings</Button>
            <Button>Admin</Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <LogOutButton />
      </CardFooter>
    </Card>
  );
}
