"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreatePost() {
  const router = useRouter();
  const [name, setName] = useState("");

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ name });
      }}
      className="flex flex-row gap-2"
    >
      <input
        type="text"
        placeholder="Paste url here"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-20 py-3 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-5 py-3 font-semibold transition hover:bg-white/20"
        disabled={createPost.isLoading || name === ""}
      >
        {createPost.isLoading ? "Shortening..." : "Shorten"}
      </button>
    </form>
  );
}
