import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { CUSTOMER_TABLE_COLUMN } from "../src/components/static/table_headers";
interface Column {
  id: "name" | "address" | "email" | "contact" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "CUSTOMER NAME", minWidth: 170 },
  {
    id: "address",
    label: "CUSTOMER ADDRESS",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "email",
    label: "EMAIL",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "contact",
    label: "CONTACT",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "action",
    label: "ACTION",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  name: string;
  address: string;
  email: string;
  contact: string;
  action: string;
}

function createData(
  name: string,
  address: string,
  email: string,
  contact: string,
  action: string
): Data {
  return { name, address, email, contact, action };
}

const rows = [
  createData("India", "IN", "e@gmail.com", "3287263", "any Action"),
  createData("China", "CN", "e@gmail.com", "3287263", "any Action"),
  createData("Italy", "IT", "e@gmail.com", "3287263", "any Action"),
  createData("United States", "uk", "e@gmail.com", "3287263", "any Action"),
  createData("Canada", "CA", "e@gmail.com", "3287263", "any Action"),
  createData("Australia", "AUS", "e@gmail.com", "3287263", "any Action"),
  createData("Germany", "DE", "e@gmail.com", "3287263", "any Action"),
  createData("Ireland", "IE", "e@gmail.com", "3287263", "any Action"),
  createData("Mexico", "MX", "e@gmail.com", "3287263", "any Action"),
  createData("Japan", "JP", "e@gmail.com", "3287263", "any Action"),
  createData("France", "FR", "e@gmail.com", "3287263", "any Action"),
  createData("United Kingdom", "GB", "e@gmail.com", "3287263", "any Action"),
  createData("Russia", "RU", "e@gmail.com", "3287263", "any Action"),
  createData("Nigeria", "NG", "e@gmail.com", "3287263", "any Action"),
  createData("Brazil", "BR", "e@gmail.com", "3287263", "any Action"),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table
          stickyHeader
          aria-label="sticky table"
          className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <TableHead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
