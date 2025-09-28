"use client";

import { api } from "~/trpc/react";
import { AnswerCard } from "./AnswerCard";
import { formatTimeAgo } from "~/helpers/formatTimeAgo";

type AnswerListProps = {
  postId: string;
};
export const AnswerList = (props: AnswerListProps) => {
  const getAnswerQuery = api.answer.getAnswerByPostId.useQuery({
    postId: props.postId,
  });
  return (
    <div className="space-y-2">
      {getAnswerQuery.data?.map((answer) => {
        return (
          <AnswerCard
            key={answer.id}
            id={answer.id}
            body={answer.body}
            createdAt={formatTimeAgo(answer.createdAt)}
            username={answer.author?.username ?? ""}
            userImage={answer.author?.image ?? ""}
          />
        );
      })}
    </div>
  );
};
