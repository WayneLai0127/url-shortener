import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

async function FetchToken({ params }: { params: { token: string } }) {
  const data = await api.urlMapping.getByToken.query({
    token: params.token,
  });
  if (!data) return redirect("/");
  return redirect(data.longUrl);
}

export default FetchToken;
