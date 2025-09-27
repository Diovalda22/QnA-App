"use client";

import { Button } from "../ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
export const Navbar = () => {
  const session = useSession();
  const handleSignIn = async () => {
    await signIn("google");
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="flex h-16 items-center justify-between border-b p-2">
      <h1 className="text-2xl font-bold">
        Nanya <span className="text-blue-500">Bang?</span>
      </h1>
      <div>
        {session.data?.user ? (
          <Button onClick={handleSignOut}>Sign Out</Button>
        ) : (
          <Button onClick={handleSignIn} className="flex items-center gap-2">
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
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
};
