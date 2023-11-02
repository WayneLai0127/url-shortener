"use client";
import Link from "next/link";
import { CreateShortUrl } from "~/app/_components/create-short-url";
import { Github, ListTodo } from "lucide-react";
import { SignInOutButton } from "./_components/authentication-button";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { isLoaded: userLoaded, isSignedIn, user } = useUser();
  // Return empty div if user isn't loaded
  if (!userLoaded) return <div />;

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <header className="absolute right-0 top-0 p-4">
        <div className="flex flex-row gap-4">
          <SignInOutButton isSignedIn={isSignedIn} user={user} />
          <Link href="https://zip-url.vercel.app/roadmap">
            <ListTodo className="h-8 w-8" />
          </Link>
          <Link href={process.env.NEXT_PUBLIC_GITHUB_REPO_URL!}>
            <Github className="h-8 w-8" />
          </Link>
        </div>
      </header>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Shorten Your <span className="text-[hsl(280,100%,70%)]">URL</span>
        </h1>

        <ShortUrlComponent />
      </div>
    </main>
  );
}

function ShortUrlComponent() {
  return (
    <div className="w-full max-w-lg">
      <CreateShortUrl />
    </div>
  );
}
