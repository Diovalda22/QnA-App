import { CreatePostCard } from "~/components/shared/CreatePostCard";
import { HomePostList } from "~/components/shared/HomePostList";
import { PostCard } from "~/components/shared/PostCard";

export default async function Home() {
  return (
    <main className="container space-y-8">
      <div className="space-y-1">
        <h1 className="text-4xl font-bold">QnA Forum</h1>
        <p className="text-muted-foreground">
          Ask questions, share knowledge, and help community grow
        </p>
      </div>
      <CreatePostCard />
      <div className="space-y-3">
        <HomePostList />
      </div>
    </main>
  );
}
