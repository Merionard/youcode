"use client";
import { Layout, LayoutContent } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { newCourseSchema } from "./newCourseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitButton } from "@/components/form/submitButton";
import { Typography } from "@/components/ui/Typography";
import { submitNewCourse } from "./action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NewCourseForm() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      throw new Error("Vous devez etre connecter pour ajouter un cours!");
    },
  });
  const router = useRouter();

  const form = useForm<z.infer<typeof newCourseSchema>>({
    resolver: zodResolver(newCourseSchema),
    defaultValues: {
      imageUrl: "",
      name: "Votre nouveau cours",
      presentation: "entrer description",
      creatorId: session?.user.id,
    },
  });
  const onSubmit = async (formData: z.infer<typeof newCourseSchema>) => {
    const { data, serverError } = await submitNewCourse(formData);
    if (data) {
      router.push(`/course/${data.course.id}`);
      router.refresh();
      toast.success(data.message);
      return;
    } else {
      toast.error("oups", { description: serverError });
    }
  };

  return (
    <Layout>
      <LayoutContent>
        <Card>
          <CardHeader>
            <Typography variant={"h2"}>Nouveau cours</Typography>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imare URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="presentation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Présentation</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end mt-2">
                  <SubmitButton>Valider</SubmitButton>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
