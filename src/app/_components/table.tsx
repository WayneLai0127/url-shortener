import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../_components/ui/table";
import dayjs from "dayjs";
import type { UrlMapping } from "@prisma/client";

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
  return (
    <>
      <div className="rounded-xl bg-white px-5 sm:px-5">
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mobile-table mx-auto max-w-screen-sm">
          {urlRecords.map((record) => (
            <div
              key={record.id}
              className="mb-8 overflow-hidden text-ellipsis rounded-lg bg-gray-100 px-24 py-4"
            >
              <div className="text-lg font-bold">Original URL:</div>
              <a href={record.longUrl} target="_blank">
                <div className="text-sm text-blue-700 sm:text-base">
                  {record.longUrl}
                </div>
              </a>
              <div className="mt-4 text-lg font-bold">Zipped URL:</div>
              <a href={currentUrl + "/" + record.token} target="_blank">
                <div className="text-sm text-blue-700 sm:text-base">
                  {currentUrl}/{record.token}
                </div>
              </a>
              <div className="mt-4 text-lg font-bold">Click Count:</div>
              <div className="text-sm text-gray-600 sm:text-base">
                {record.clickCount}
              </div>
              <div className="mt-4 text-lg font-bold">Created At:</div>
              <div className="text-sm text-gray-600 sm:text-base">
                {dayjs(record.createdAt).format("YYYY-MM-DD")}
              </div>
              <div className="mt-4 text-lg font-bold">Expires At:</div>
              <div className="text-sm text-gray-600 sm:text-base">
                {dayjs(record.expiresAt).format("YYYY-MM-DD")}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
