"use client";
import { useForm, Controller } from "react-hook-form";
import { Form, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { addEntry } from "@/blog";
import { BlogEntry } from "@/types";
import { cn } from "@/lib/utils";

export function BlogForm() {
  const form = useForm<BlogEntry>({
    defaultValues: {
      title: "",
      text: "",
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = form;

  const onSubmit = async (data: BlogEntry) => {
    await addEntry(data);
    reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="title">Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Controller
          name="text"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="text">Text</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div>
          <Button
            type="submit"
            disabled={!isValid}
            className={cn(
              "w-full cursor-pointer",
              !isValid && "bg-gray-300 text-gray-500"
            )}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
