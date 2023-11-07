import { CreateShortUrl } from "~/app/_components/create-short-url";

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Shorten Your <span className="text-[hsl(280,100%,70%)]">URL</span>
      </h1>

      <ShortUrlComponent />
    </div>
  );
}

function ShortUrlComponent() {
  return (
    <div className="w-full max-w-lg">
      <CreateShortUrl />
    </div>
  );
}
