"use client";

import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

import { api } from "~/trpc/react";
import { useToastLimit } from "./toast-limiter";
import ShowShortUrl from "./show-short-url";

const TOAST_LIMIT = 3;

export function CreateShortUrl() {
  useToastLimit(TOAST_LIMIT);
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");

  const createUrlMapping = api.urlMapping.create.useMutation({
    onSuccess: (msg) => {
      setShortUrl(window.location.href + msg.token);
      setOriginalUrl(url);
      setUrl("");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.longUrl;
      if (errorMessage?.[0]) {
        toast.error(errorMessage?.[0]);
      } else {
        toast.error("Failed to post! Please try again later.");
      }
    },
  });

  return (
    <div className="flex flex-col gap-10">
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createUrlMapping.mutate({ longUrl: url });
          }}
          className="flex flex-row gap-2"
        >
          <input
            type="text"
            placeholder="Paste url here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full rounded-full px-20 py-3 pl-5 pr-5 text-black"
          />
          <button
            type="submit"
            className="rounded-full bg-white/10 px-5 py-3 font-semibold transition hover:bg-white/20"
            disabled={createUrlMapping.isLoading || url === ""}
          >
            {createUrlMapping.isLoading ? "Shortening..." : "Shorten"}
          </button>
          <Toaster position="bottom-center" />
        </form>
      </div>
      <div>
        {shortUrl && <ShowShortUrl url={shortUrl} originalUrl={originalUrl} />}
      </div>
    </div>
  );
}
