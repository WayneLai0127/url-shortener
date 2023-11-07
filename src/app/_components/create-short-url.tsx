"use client";

import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

import { api } from "~/trpc/react";
import { useToastLimit } from "./toast-limiter";
import ShowShortUrl from "./show-short-url";
import { useUser } from "@clerk/nextjs";

const TOAST_LIMIT = 3;

export function CreateShortUrl() {
  useToastLimit(TOAST_LIMIT);
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const { isLoaded: userLoaded, isSignedIn, user } = useUser();

  // Return empty div if user isn't loaded
  if (!userLoaded) return <div />;

  const createUrlMapping = api.urlMapping.create.useMutation({
    onSuccess: (msg) => {
      setShortUrl(window.location.href + msg.token);
      setOriginalUrl(url);
      setUrl("");
    },
    onError: (e) => {
      const zodErrorMessage = e.data?.zodError?.fieldErrors.longUrl;
      if (zodErrorMessage?.[0]) {
        toast.error(zodErrorMessage?.[0]);
      } else {
        toast.error("Failed to post! Please try again later.");
      }
    },
  });

  const createUrlMappingWithAlias = api.urlMapping.createWithAlias.useMutation({
    onSuccess: (msg) => {
      setShortUrl(window.location.href + msg.token);
      setOriginalUrl(url);
      setUrl("");
      setAlias("");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.longUrl;
      if (errorMessage?.[0]) {
        // zod error
        toast.error(errorMessage?.[0]);
      } else if (e.message === "ALIAS_ALREADY_EXIST") {
        toast.error("Alias already exists");
      } else {
        toast.error("Failed to post! Please try again later.");
      }
    },
  });

  return (
    <div className="flex flex-col gap-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isSignedIn && alias !== "")
            createUrlMappingWithAlias.mutate({
              longUrl: url,
              alias,
              createdBy: user.id,
            });
          else createUrlMapping.mutate({ longUrl: url });
        }}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder={
            isSignedIn
              ? "Custom alias (optional)"
              : "Sign in to enable custom alias (optional)"
          }
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          className="w-full min-w-0 rounded-full px-20 py-3 pl-5 pr-5 text-black lg:w-1/2"
          disabled={!isSignedIn}
        />

        <input
          type="text"
          placeholder="Paste url here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full rounded-full px-20 py-3 pl-5 pr-5 text-black"
        />
        <div className="text-right">
          <button
            type="submit"
            className="rounded-full bg-white/10 px-5 py-3 font-semibold transition hover:bg-white/20"
            disabled={
              createUrlMapping.isLoading ||
              createUrlMappingWithAlias.isLoading ||
              url === ""
            }
          >
            {createUrlMapping.isLoading || createUrlMappingWithAlias.isLoading
              ? "Shortening..."
              : "Shorten"}
          </button>
        </div>
        <Toaster position="bottom-center" />
      </form>
      <div>
        {shortUrl && <ShowShortUrl url={shortUrl} originalUrl={originalUrl} />}
      </div>
    </div>
  );
}
