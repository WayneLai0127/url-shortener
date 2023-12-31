import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import dayjs from "dayjs";
import type { UrlMapping } from "@prisma/client";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { api } from "~/trpc/react";
import { toast, Toaster } from "react-hot-toast";
import { useToastLimit } from "./toast-limiter";

const TOAST_LIMIT = 3;

interface UrlTableProps {
  urlRecords: UrlMapping[];
  currentUrl: string;
}

const styles = `
  /* CSS-in-JS styling for Next.js */
  @media (min-width: 1000px) {
    .mobile-table {
      display: none;
    }
  }

  @media (max-width: 999px) {
    .table-container {
      display: none;
    }
  }
`;

export const UrlTable: React.FC<UrlTableProps> = ({
  urlRecords,
  currentUrl,
}) => {
  useToastLimit(TOAST_LIMIT);
  const deleteRecord = api.urlMapping.deleteById.useMutation({
    onSuccess: () => {
      toast.success("Successfully deleted");
      window.location.reload();
    },
    onError: () => {
      toast.error("Failed to delete, please try again later");
    },
  });

  return (
    <>
      <div className="rounded-xl bg-white px-5 sm:px-1">
        {/* Desktop View */}
        <div className="table-container">
          <Table>
            <TableCaption>
              This is the list of all URLs created by you
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Original Url</TableHead>
                <TableHead>Zipped Url</TableHead>
                <TableHead>Click Count</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Expires At</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {urlRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="w-1/3">
                    <a
                      href={record.longUrl}
                      target="_blank"
                      className="hover:text-blue-700"
                    >
                      {record.longUrl}
                    </a>
                  </TableCell>
                  <TableCell>
                    <a
                      href={currentUrl + "/" + record.token}
                      target="_blank"
                      className="hover:text-blue-700"
                    >
                      {currentUrl}/{record.token}
                    </a>
                  </TableCell>
                  <TableCell>{record.clickCount}</TableCell>
                  <TableCell>
                    {dayjs(record.createdAt).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell>
                    {dayjs(record.expiresAt).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell>
                    <form
                      onSubmit={() => {
                        deleteRecord.mutate({ id: record.id });
                      }}
                    >
                      <Button variant="destructive" type="submit">
                        <Trash2 />
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* Mobile View */}
        <div className="mobile-table mx-auto max-w-screen-sm">
          {urlRecords.map((record) => (
            <div
              key={record.id}
              className="mb-8 flex-row overflow-hidden text-ellipsis rounded-lg bg-gray-100 px-4 py-4"
            >
              <div className="text-lg font-bold">Original URL:</div>
              <a href={record.longUrl} target="_blank">
                <div className="break-all text-sm text-blue-700 sm:text-base">
                  {record.longUrl}
                </div>
              </a>
              <div className="mt-4 text-lg font-bold">Zipped URL:</div>
              <a href={currentUrl + "/" + record.token} target="_blank">
                <div className="text-sm text-blue-700 sm:text-base">
                  {currentUrl}/{record.token}
                </div>
              </a>
              {/* smaller elements */}
              <div className="mt-4 flex flex-col space-x-px sm:flex-row">
                <div className="flex flex-row py-1">
                  <div className="text-lg font-bold">Click Count:</div>
                  <div className="text-md mt-0.5 object-bottom px-4 text-gray-600 sm:text-base">
                    {record.clickCount}
                  </div>
                </div>
                <div className="flex flex-row py-1">
                  <div className="text-lg font-bold">Created At:</div>
                  <div className="text-md mt-0.5 object-bottom px-4 text-gray-600 sm:text-base">
                    {dayjs(record.createdAt).format("YYYY-MM-DD")}
                  </div>
                </div>
                <div className="flex flex-row py-1">
                  <div className="text-lg font-bold">Expires At:</div>
                  <div className="text-md mt-0.5 object-bottom px-4 text-gray-600 sm:text-base">
                    {dayjs(record.expiresAt).format("YYYY-MM-DD")}
                  </div>
                </div>
                <div className="flex flex-row py-1">
                  <form
                    onSubmit={() => {
                      deleteRecord.mutate({ id: record.id });
                    }}
                  >
                    <Button variant="destructive" type="submit">
                      <Trash2 />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Toaster position="bottom-center" />
      <style jsx>{styles}</style>
    </>
  );
};

export const UrlTableSkeleton: React.FC = () => {
  return (
    <>
      <div className="rounded-xl bg-white px-5 sm:px-1">
        {/* Desktop View */}
        <div className="table-container">
          <Table>
            <TableCaption>
              This is the list of all URLs created by you
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Original Url</TableHead>
                <TableHead>Zipped Url</TableHead>
                <TableHead>Click Count</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Expires At</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(5)
                .fill(0)
                .map(() => (
                  <TableRow key={""}>
                    <TableCell colSpan={6}>
                      <Skeleton className="h-8 w-[1000px]" />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        {/* Mobile View */}
        <div className="mobile-table mx-auto max-w-screen-sm">
          {Array(2)
            .fill(0)
            .map(() => (
              <div
                className="bg-white-100 mb-8 flex-row overflow-hidden text-ellipsis rounded-lg px-4 py-4"
                key={""}
              >
                <div className="text-lg font-bold">Original URL:</div>
                <Skeleton className=" w-128 h-7" />
                <div className="mt-4 text-lg font-bold">Zipped URL:</div>
                <Skeleton className=" w-128 h-7" />
                {/* smaller elements */}
                <div className="mt-4 flex flex-col space-x-px sm:flex-row">
                  <div className="flex flex-row py-1">
                    <div className="text-lg font-bold">Click Count:</div>
                    <Skeleton className="ml-3 mr-2 h-8 w-16" />
                  </div>
                  <div className="flex flex-row py-1">
                    <div className="text-lg font-bold">Created At:</div>
                    <Skeleton className="ml-3 mr-2 h-8 w-16" />
                  </div>
                  <div className="flex flex-row py-1">
                    <div className="text-lg font-bold">Expires At:</div>
                    <Skeleton className="ml-3 mr-2 h-8 w-16" />
                  </div>
                  <div className="flex flex-row py-1">
                    <Skeleton className="ml-3 mr-2 h-8 w-8" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
