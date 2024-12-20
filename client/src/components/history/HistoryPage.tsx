import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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

export type DataRecord = {
  received_at: Date;
  temperature: Number;
  humidity: Number;
  tilt: Number;
  uv: Number;
  potentioValue: Number;
};

const columns: ColumnDef<DataRecord>[] = [
  { accessorKey: "received_at", header: "Time" },
  { accessorKey: "temperature", header: "Temperature" },
  { accessorKey: "humidity", header: "Humidity" },
  { accessorKey: "tilt", header: "Tilt Degree" },
  { accessorKey: "uv", header: "UV Index" },
  { accessorKey: "potentioValue", header: "Brightness" },
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
  const [data, setData] = useState<DataRecord[]>([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/dataRecords")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

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