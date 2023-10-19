import QRCode from "react-qr-code";

import { Link } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function ShowShortUrl({
  url,
  originalUrl,
}: {
  url: string;
  originalUrl: string;
}) {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Short Url is ready! 🥳</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="row flex gap-3">
          <div className="grid w-full items-center gap-2 overflow-hidden">
            <p className="scroll-m-20 text-xl font-semibold tracking-tight">
              Old url:
            </p>
            <p className="overflow-hidden overflow-ellipsis whitespace-pre">
              {originalUrl}
            </p>
            <p className="scroll-m-20 text-xl font-semibold tracking-tight">
              New url:
            </p>

            <div className="flex items-center gap-1">
              <a
                href={url}
                target="_blank"
                className="text-slate-900 hover:text-blue-700"
              >
                <Link size={20} />
              </a>
              <a
                href={url}
                target="_blanck"
                className="text-slate-900 underline hover:text-blue-700"
              >
                {url}
              </a>
            </div>
          </div>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "50%", width: "50%" }}
            value={url}
            viewBox={`0 0 256 256`}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={async () => {
            await navigator.clipboard.writeText(url);
            setIsCopied(true);
          }}
        >
          {isCopied ? "Copied!" : "Copy Url"}
        </Button>
      </CardFooter>
    </Card>
  );
}
