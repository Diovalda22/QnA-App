"use client";

import z from "zod";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormItem,
  FormControl,
  FormField,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";

const answerFormSchema = z.object({
  body: z.string().min(1, "Minimum 1 karakter yah").max(500),
});

type answerFormSchema = z.infer<typeof answerFormSchema>;
type CreateAnswerCardProps = {
  postId: string;
};

export const CreateAnswerCard = (props: CreateAnswerCardProps) => {
  const { data: session } = useSession();
  const form = useForm<answerFormSchema>({
    resolver: zodResolver(answerFormSchema),
    defaultValues: {
      body: "",
    },
  });

  const apiUtils = api.useUtils();

  const createAnswerMutation = api.answer.createAnswer.useMutation({
    onSuccess: async () => {
      alert("Answer Submitted!");
      form.reset();

      await apiUtils.answer.getAnswerByPostId.invalidate({
        postId: props.postId,
      });
    },
  });

  const getAnswerQuery = api.answer.getAnswerByPostId.useQuery({
    postId: props.postId,
  });

  const handleCreateAnswer = (values: answerFormSchema) => {
    createAnswerMutation.mutate({
      body: values.body,
      postId: props.postId,
    });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xl font-semibold">
        {getAnswerQuery.data?.length ?? 0} Answer
      </h3>
      <Form {...form}>
        <Card>
          <CardHeader>Your Answer</CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Avatar className="border-background size-12 border-4">
                <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-xl text-white">
                  {session?.user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
                <AvatarImage src={session?.user.image ?? ""} />
              </Avatar>

              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea
                        placeholder="Write your answer bang"
                        className="min-h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              disabled={createAnswerMutation.isPending}
              onClick={form.handleSubmit(handleCreateAnswer)}
            >
              {createAnswerMutation.isPending
                ? "Submitting..."
                : "Submit Answer"}
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
};
