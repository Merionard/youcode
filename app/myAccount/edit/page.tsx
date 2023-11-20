import { Layout, LayoutContent } from "@/components/layout/Layout";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { prisma } from "@/db/prisma";
import { getRequiredAuthSession } from "@/lib/auth";
import { useSession } from "next-auth/react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const formScheme = z.object({
  name: z.string().min(3).max(40),
  image: z.string().url(),
});

export default async function EditAccountPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getRequiredAuthSession();

  async function editAccount(formData: FormData) {
    "use server";
    const name = formData.get("name")?.toString() ?? "";
    const image = formData.get("picture")?.toString() ?? "";
    const data = { name, image };

    const validation = formScheme.safeParse(data);
    if (!validation.success) {
      const searchParam = new URLSearchParams();
      searchParam.set("error", validation.error.message);
      redirect(`/myAccount/edit?${searchParam.toString()}`);
    } else {
      const userSession = await getRequiredAuthSession();
      await prisma.user.update({
        where: {
          id: userSession.user.id,
        },
        data: data,
      });
      revalidatePath("/myAccount");
      redirect("/myAccount");
    }
  }
  return (
    <Layout>
      <LayoutContent>
        <Card>
          <CardHeader>
            <CardTitle>Modifier votre compte</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={editAccount}>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Image</Label>
                <Input
                  id="picture"
                  name="picture"
                  defaultValue={session.user.image}
                />
                <Label htmlFor="name">Nom</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={session.user.name ?? ""}
                />
              </div>
              {searchParams.error && (
                <Typography> Error: {searchParams.error as string}</Typography>
              )}
              <Button type="submit">Valider</Button>
            </form>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
