import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { api } from "~/trpc/server";

import { formatTimeAgo } from "~/helpers/formatTimeAgo";
import { Badge } from "~/components/ui/badge";
import Link from "next/link";
import { CreateAnswerCard } from "~/components/shared/CreateAnswerCard";
import { AnswerList } from "~/components/shared/AnswerList";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const postDetail = await api.post.getPostById({ postId });
  return (
    <div className="space-y-8">
      <div className="space-y-6 rounded-xl border p-4 shadow">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Avatar className="border-background size-12 border-4">
              <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-xl text-white">
                {postDetail?.author?.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
              <AvatarImage src={postDetail?.author?.image ?? ""} />
            </Avatar>
            <div className="space-y-0.5">
              <Link href={"/profile/" + postDetail?.author?.username}>
                <p className="font-medium">{postDetail?.author?.username}</p>
              </Link>
              <p className="text-muted-foreground text-sm">
                {postDetail?.createdAt
                  ? formatTimeAgo(postDetail.createdAt)
                  : ""}
              </p>
            </div>
          </div>
          <Badge className="h-fit" variant={"secondary"}>
            UNANSWERED
          </Badge>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">{postDetail?.title}</h1>
          <p>{postDetail?.description}</p>
        </div>
      </div>

      <CreateAnswerCard postId={postId} />
      <AnswerList postId={postId} />
    </div>
  );
}
