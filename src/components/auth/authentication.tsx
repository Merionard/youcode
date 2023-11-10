"use client";

import { Loader2, LogIn, LogOut } from "lucide-react";
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
import { useMutation } from "@tanstack/react-query";
import { Loader } from "../ui/Loader";

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
                <Button
                  variant={"destructive"}
                  onClick={() => mutation.mutate()}
                >
                  {mutation.isPending ? (
                    <Loader className="mr-2" size={12} />
                  ) : (
                    <LogOut size={12} className="mr-2" />
                  )}
                  Déconnexion
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
