"use client";

import { Loader2, LogIn, LogOut, User2 } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "../ui/Loader";
import Link from "next/link";
import { LogOutButton } from "./LogOutButton";

export const Authentication = () => {
  const { data: session } = useSession();
  const mutation = useMutation({
    mutationFn: () => signOut(),
  });
  if (session) {
    return (
      <>
        <DropdownMenu>
          <AlertDialog>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size={"sm"}>
                {session.user.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href={`/myAccount`}>
                  <User2 className="mr-2" size={12} />
                  Mon profil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialogTrigger asChild>
                <DropdownMenuItem>
                  <Button>
                    {<LogOut size={12} className="mr-2" />} Déconnexion
                  </Button>
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Est vous sur de vouloir vous déconnecter?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <LogOutButton />
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenu>
      </>
    );
  }
  return (
    <Button onClick={() => signIn()} variant={"outline"} size={"sm"}>
      {<LogIn size={12} className="mr-2" />}Connexion
    </Button>
  );
};
