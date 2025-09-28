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
import { signIn, useSession } from "next-auth/react";
import { Loader2, LockOpen } from "lucide-react";

// Validation
const createPostFormSchema = z.object({
  title: z.string().max(100, "Maksimal 100 karakter bang"),
  description: z.string().max(1000, "Maksimal 1000 karakter bang"),
});

// Type
type createPostFormSchema = z.infer<typeof createPostFormSchema>;

export const CreatePostCard = () => {
  const session = useSession();

  const form = useForm<createPostFormSchema>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const apiUtils = api.useUtils();

  const createPostMutation = api.post.createPost.useMutation({
    onSuccess: async () => {
      alert("Created Post!");
      form.reset();

      await apiUtils.post.getAllPosts.invalidate();
    },
  });

  const handleCreatePost = (values: createPostFormSchema) => {
    createPostMutation.mutate({
      title: values.title,
      description: values.description,
    });
  };

  // Show loading state while checking authentication
  if (session.status === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="text-muted-foreground h-10 w-10 animate-spin" />
          <span className="text-muted-foreground text-lg">Loading...</span>
        </div>
      </div>
    );
  }

  // Show login prompt if user is not authenticated
  if (session.status !== "authenticated") {
    return (
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <div className="text-muted-foreground flex flex-col items-center justify-center py-12">
            <LockOpen className="text-muted-foreground size-20" />
            <p className="text-lg font-medium">
              Masuk untuk mengajukan pertanyaan
            </p>
            <p className="mb-4 text-sm">
              Silakan login dengan Google untuk mulai bertanya di forum ini.
            </p>
            <Button
              onClick={() => signIn("google")}
              className="flex items-center gap-2"
              variant="outline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 48 48"
                className="h-5 w-5"
              >
                <g>
                  <path
                    fill="#4285F4"
                    d="M43.6 20.5h-1.9V20H24v8h11.3c-1.5 4-5.2 7-9.3 7-5.5 0-10-4.5-10-10s4.5-10 10-10c2.4 0 4.6.9 6.3 2.3l6.1-6.1C33.5 8.1 28.9 6 24 6 13.5 6 5 14.5 5 25s8.5 19 19 19c9.5 0 18-7.5 18-19 0-1.3-.1-2.5-.4-3.5z"
                  />
                  <path
                    fill="#34A853"
                    d="M6.3 14.7l6.6 4.8C14.5 16.1 19 13 24 13c2.4 0 4.6.9 6.3 2.3l6.1-6.1C33.5 8.1 28.9 6 24 6c-7.1 0-13.1 4.1-16.1 8.7z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M24 44c5.2 0 9.6-1.7 12.8-4.7l-6-4.9C28.6 36.9 26.4 37.8 24 37.8c-4.1 0-7.8-3-9.3-7H6.3C9.3 39.9 16.3 44 24 44z"
                  />
                  <path
                    fill="#EA4335"
                    d="M43.6 20.5h-1.9V20H24v8h11.3c-0.7 2-2.1 3.7-3.9 4.9l6 4.9c3.5-3.2 5.6-7.9 5.6-13.3 0-1.3-.1-2.5-.4-3.5z"
                  />
                </g>
              </svg>
              Masuk dengan Google
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <Card>
        <CardHeader className="text-2xl font-bold">Ask a Question</CardHeader>

        <CardContent>
          <div className="flex gap-4">
            <Avatar className="border-background size-12 border-4">
              <AvatarFallback className="via-blue-700-800 border border-gray-700 bg-gradient-to-r from-gray-800 to-blue-900 text-xl text-white shadow-lg">
                {session.data.user.name?.charAt(0).toUpperCase() ?? "?"}
              </AvatarFallback>
              <AvatarImage src={session.data.user.image ?? ""} />
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
