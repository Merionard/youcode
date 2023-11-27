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
import { LessonSchema } from "./lessonSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitButton } from "@/components/form/submitButton";
import { editLesson } from "./action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const LessonForm = ({ lesson }: { lesson: Lesson }) => {
  const form = useForm<z.infer<typeof LessonSchema>>({
    resolver: zodResolver(LessonSchema),
    defaultValues: {
      name: lesson.name,
      state: lesson.state,
      id: lesson.id,
    },
  });
  const router = useRouter();

  const onSubmit = async (formData: z.infer<typeof LessonSchema>) => {
    console.log(formData);
    const { data, serverError } = await editLesson(formData);
    if (data) {
      toast.success(data);
      router.push(`/course/${lesson.courseId}`);
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
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
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
        <div className="flex justify-end mt-2">
          <SubmitButton>Valider</SubmitButton>
        </div>
      </form>
    </Form>
  );
};
