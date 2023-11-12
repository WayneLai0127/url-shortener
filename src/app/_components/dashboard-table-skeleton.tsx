import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../_components/ui/table";
import { Skeleton } from "./ui/skeleton";

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
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(5)
                .fill(0)
                .map(() => (
                  <TableRow key={""}>
                    <TableCell colSpan={5}>
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
                </div>
              </div>
            ))}
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
