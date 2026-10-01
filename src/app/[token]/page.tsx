import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

// Next.js 16: `params` is a Promise and must be awaited.
async function FetchToken(props: { params: Promise<{ token: string }> }) {
  const { token } = await props.params;
  const data = await api.urlMapping.getByToken.query({ token });
  if (!data) return redirect("/");
  await api.urlMapping.increaseClickCount.mutate({ alias: token });
  return redirect(encodeURI(data.longUrl));
}

export default FetchToken;
