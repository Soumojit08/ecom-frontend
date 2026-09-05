import { flexRender } from "@tanstack/react-table";
import { getCoreRowModel, useLegacyTable } from "@tanstack/react-table/legacy";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ProductColumns from "./ProductColumns";

function ProductTable({ products }) {
  const table = useLegacyTable({
    data: products ?? [],
    columns: ProductColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={ProductColumns.length}
              className="h-24 text-center"
            >
              No products found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default ProductTable;
