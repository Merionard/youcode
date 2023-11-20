"use client";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { Loader } from "../ui/Loader";
import { LogOut } from "lucide-react";

export const LogOutButton = () => {
  const mutation = useMutation({
    mutationFn: () => signOut(),
  });

  return (
    <Button variant={"destructive"} onClick={() => mutation.mutate()}>
      {mutation.isPending ? (
        <Loader className="mr-2" size={12} />
      ) : (
        <LogOut size={12} className="mr-2" />
      )}
      Déconnexion
    </Button>
  );
};
