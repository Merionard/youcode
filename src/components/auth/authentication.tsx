"use client";

import { LogIn, LogOut } from "lucide-react";
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
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const Authentication = () => {
  const { data: session } = useSession();
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
                <Button variant={"destructive"} onClick={() => signOut()}>
                  {<LogOut size={12} className="mr-2" />} Déconnexion
                </Button>
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
