"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Course } from "@prisma/client";
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
import { Button } from "@/components/ui/button";
import { safeSubmitCourseForm, submitCourseForm } from "./action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { formSchema } from "./courseSchema";

export const CourseForm = (props: { course: Course }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: props.course.name,
      imageUrl: props.course.image,
      presentation: props.course.presentation,
      courseId: props.course.id,
    },
  });

  async function onSubmit(formData: z.infer<typeof formSchema>) {
    console.log(formData);
    const { data, serverError } = await safeSubmitCourseForm(formData);
    if (data) {
      router.push(`/course/${props.course.id}`);
      router.refresh();
      toast.success("Cours édité avec succès");
      return;
    } else {
      toast.error("oups", { description: serverError });
    }
  }

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
          <Button type="submit">Valider</Button>
        </div>
      </form>
    </Form>
  );
};
