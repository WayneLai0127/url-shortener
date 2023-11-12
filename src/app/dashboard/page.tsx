"use client";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";
import { api } from "~/trpc/react";
import { UrlTable, UrlTableSkeleton } from "../_components/dashboard-table";

export default function Home() {
  const { isLoaded: userLoaded, isSignedIn, user } = useUser();
  // Return empty div if user isn't loaded
  if (!userLoaded) return <div />;

  if (!isSignedIn) return <RedirectToSignIn />;
  const { data: urlRecords, isLoading } = api.urlMapping.getByCreator.useQuery({
    userId: user.id,
  });

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Your Shortened <span className="text-[hsl(280,100%,70%)]">URL</span>
      </h1>
      <div className="rounded-xl bg-white px-5 py-5 text-black">
        {isLoading || !urlRecords ? (
          <UrlTableSkeleton />
        ) : (
          <UrlTable
            urlRecords={urlRecords}
            currentUrl={window.location.origin}
          />
        )}
      </div>
    </div>
  );
}
