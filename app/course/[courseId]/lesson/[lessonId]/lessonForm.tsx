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

export const LessonForm = ({ lesson }: { lesson: Lesson }) => {
  const form = useForm<z.infer<typeof LessonSchema>>({
    resolver: zodResolver(LessonSchema),
    defaultValues: {
      name: lesson.name,
      state: lesson.state,
    },
  });

  const onSubmit = (formData: z.infer<typeof LessonSchema>) => {
    console.log(formData);
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
      </form>
    </Form>
  );
};
