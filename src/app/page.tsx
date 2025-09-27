"use client";

import { Loader2, LockOpen } from "lucide-react";
import { useSession } from "next-auth/react";
import { CreatePostCard } from "~/components/shared/CreatePostCard";

export default function Home() {
  const session = useSession();

  if (session.status === "loading") {
    return (
      <main className="container flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="text-muted-foreground h-10 w-10 animate-spin" />
          <span className="text-muted-foreground text-lg">Loading...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="container space-y-8">
      {session.status === "authenticated" ? (
        <>
          <div className="space-y-1">
            <h1 className="text-4xl font-bold">QnA Forum</h1>
            <p className="text-muted-foreground">
              Ask questions, share knowledge, and help community grow
            </p>
          </div>
          <CreatePostCard />
        </>
      ) : (
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="bg-card rounded-2xl border p-6 text-center shadow-sm">
              <div className="mb-4 flex justify-center">
                <LockOpen className="text-muted-foreground h-12 w-12" />
              </div>
              <h2 className="mb-2 text-xl font-semibold">
                Bergabung dengan Diskusi!
              </h2>
              <p className="text-muted-foreground mb-6">
                Login untuk mulai bertanya, menjawab, dan berbagi pengetahuan
                dengan komunitas QnA Forum.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
