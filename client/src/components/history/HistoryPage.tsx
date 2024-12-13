import { useNavigate } from "react-router-dom";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import "./historyPage.css";

import bg_img from "../../assets/img/bg_img.jpg";
import web_logo from "../../assets/img/logo.png";

export type User = {
  time: string;
  temperature: number;
  humidity: number;
  tilt_degree: number;
  uv_index: number;
  brightness: number;
};

const pencase_data: User[] = [
  {
    time: "19:00 13/12/2024",
    temperature: 27,
    humidity: 30,
    tilt_degree: 0,
    uv_index: 0,
    brightness: 100,
  },
  {
    time: "20:00 13/12/2024",
    temperature: 28,
    humidity: 32,
    tilt_degree: 1,
    uv_index: 1,
    brightness: 90,
  },
  {
    time: "21:00 13/12/2024",
    temperature: 26,
    humidity: 31,
    tilt_degree: 2,
    uv_index: 2,
    brightness: 85,
  },
  {
    time: "22:00 13/12/2024",
    temperature: 25,
    humidity: 33,
    tilt_degree: 3,
    uv_index: 3,
    brightness: 80,
  },
  {
    time: "23:00 13/12/2024",
    temperature: 24,
    humidity: 34,
    tilt_degree: 4,
    uv_index: 4,
    brightness: 75,
  },
  {
    time: "00:00 14/12/2024",
    temperature: 23,
    humidity: 35,
    tilt_degree: 5,
    uv_index: 5,
    brightness: 70,
  },
  {
    time: "01:00 14/12/2024",
    temperature: 22,
    humidity: 36,
    tilt_degree: 6,
    uv_index: 6,
    brightness: 65,
  },
  {
    time: "02:00 14/12/2024",
    temperature: 21,
    humidity: 37,
    tilt_degree: 7,
    uv_index: 7,
    brightness: 60,
  },
  {
    time: "03:00 14/12/2024",
    temperature: 20,
    humidity: 38,
    tilt_degree: 8,
    uv_index: 8,
    brightness: 55,
  },
  {
    time: "04:00 14/12/2024",
    temperature: 19,
    humidity: 39,
    tilt_degree: 9,
    uv_index: 9,
    brightness: 50,
  }
];

const columns: ColumnDef<User>[] = [
  { accessorKey: "time", header: "Time" },
  { accessorKey: "temperature", header: "Temperature" },
  { accessorKey: "humidity", header: "Humidity" },
  { accessorKey: "tilt_degree", header: "Tilt Degree" },
  { accessorKey: "uv_index", header: "UV Index" },
  { accessorKey: "brightness", header: "Brightness" },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="table-wrapper">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="table-header"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="table-cell"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="table-cell"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="pagination-controls">
        <div>
          <span className="table-header">Rows per page:</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {[5, 10, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="button"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="button"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

function HistoryPage() {
  const nav = useNavigate();
  const data = pencase_data;

  return (
    <div className="overflow-hidden flex relative">
      <img src={bg_img} alt="Background" className="web-bg" />
      <div className="web-content">
        <div className="section h-[15dvh] flex-row justify-between items-center">
          <img
            src={web_logo}
            alt="Logo"
            className="web-logo"
            onClick={() => nav("/account")}
          />
        </div>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
        <div className="section h-auto mt-4 flex-col justify-center items-center"></div>
      </div>
    </div>
  );
}

export default HistoryPage;