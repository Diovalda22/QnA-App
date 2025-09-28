"use client";

import { api } from "~/trpc/react";
import { PostCard } from "./PostCard";
import { Clock } from "lucide-react";

export const HomePostList = () => {
  const postQuery = api.post.getAllPosts.useQuery();

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold">Recent Question</h2>

      <div>
        {/* Post Card */}
        {postQuery.data && postQuery.data.length > 0 ? (
          postQuery.data.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              username={post.author?.username ?? "Anonymous"}
              userImage={post.author?.image ?? ""}
              status="UNANSWERED"
              title={post.title}
              description={post.description}
              createdDate={post.createdAt}
              totalComments={0}
            />
          ))
        ) : (
          <div className="text-muted-foreground flex flex-col items-center justify-center py-12">
            <Clock className="text-muted-foreground size-20" />
            <p className="text-lg font-medium">Belum ada pertanyaan.</p>
            <p className="text-sm">Jadilah yang pertama untuk bertanya!</p>
          </div>
        )}
      </div>
    </div>
  );
};
