"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/trpc/react";

// Validation
const createPostFromSchema = z.object({
  title: z.string().max(100, "Maksimal 100 karakter bang"),
  description: z.string().max(1000, "Maksimal 1000 karakter bang"),
});

// Type
type createPostFromSchema = z.infer<typeof createPostFromSchema>;

export const CreatePostCard = () => {
  const form = useForm<createPostFromSchema>({
    resolver: zodResolver(createPostFromSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const createPostMutation = api.post.createPost.useMutation({
    onSuccess: () => {
      alert("Created Post!");
      form.reset();
    },
  });

  const handleCreatePost = (values: createPostFromSchema) => {
    createPostMutation.mutate({
      title: values.title,
      description: values.description,
    });
  };
  return (
    <Form {...form}>
      <Card>
        <CardHeader className="text-2xl font-bold">Ask a Question</CardHeader>

        <CardContent>
          <div className="flex gap-4">
            <Avatar className="border-background size-12 border-4">
              <AvatarFallback className="via-blue-700-800 border border-gray-700 bg-gradient-to-r from-gray-800 to-blue-900 text-xl text-white shadow-lg">
                DF
              </AvatarFallback>
              <AvatarImage src="" />
            </Avatar>
            <div className="w-full space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter your question title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your question in detail"
                        className="min-h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button
            disabled={createPostMutation.isPending}
            onClick={form.handleSubmit(handleCreatePost)}
          >
            {createPostMutation.isPending ? "Submitting..." : "Submit Question"}
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
};
