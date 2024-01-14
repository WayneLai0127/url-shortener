"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { SignInOutButton } from "./authentication-button";
import { Github, ListTodo } from "lucide-react";
import { Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { HeaderUserLoading } from "./header-user-loading";

export const Header = () => {
  const { isLoaded: isUserLoaded, isSignedIn, user } = useUser();
  // Return empty div if user isn't loaded
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header>
      {!isHome && (
        <div className="absolute left-0 top-0 p-4">
          <Link href={window.location.origin}>
            <Home className="h-8 w-8" />
          </Link>
        </div>
      )}
      <div className="absolute right-0 top-0 p-4">
        <div className="flex flex-row gap-4">
          {isUserLoaded ? (
            <SignInOutButton isSignedIn={isSignedIn} user={user} />
          ) : (
            <HeaderUserLoading />
          )}
          <Link href="/dashboard" style={{ marginTop: "4px" }}>
            Dashboard
          </Link>
          <Link href="https://zip-url.vercel.app/roadmap">
            <ListTodo className="h-8 w-8" />
          </Link>
          <Link href={process.env.NEXT_PUBLIC_GITHUB_REPO_URL!}>
            <Github className="h-8 w-8" />
          </Link>
        </div>
      </div>
    </header>
  );
};
