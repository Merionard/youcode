"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { prisma } from "@/db/prisma";
import { Lesson, LessonState } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitButton } from "@/components/form/submitButton";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { newLessonSchema } from "./newLessonSchema";
import { Textarea } from "@/components/ui/textarea";
import { newLessonAction } from "./newLessonAcction";

export const NewLessonForm = ({ courseId }: { courseId: string }) => {
  const form = useForm<z.infer<typeof newLessonSchema>>({
    resolver: zodResolver(newLessonSchema),
    defaultValues: {
      name: "",
      state: LessonState.HIDDEN,
      content: "",
      courseId: courseId,
    },
  });
  const router = useRouter();

  const onSubmit = async (formData: z.infer<typeof newLessonSchema>) => {
    console.log(formData);
    const { data, serverError } = await newLessonAction(formData);
    if (data) {
      toast.success(data);
      router.push(`/course/${courseId}`);
      router.refresh();
    } else if (serverError) {
      toast.error(serverError);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom leçon</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Statut</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={LessonState.HIDDEN}>
                    {LessonState.HIDDEN}
                  </SelectItem>
                  <SelectItem value={LessonState.PUBLIC}>
                    {LessonState.PUBLIC}
                  </SelectItem>
                  <SelectItem value={LessonState.PUBLISHED}>
                    {LessonState.PUBLISHED}
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenu</FormLabel>
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
  );
};
