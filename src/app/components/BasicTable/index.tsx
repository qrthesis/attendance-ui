import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";

import { ITableProps } from "./types";

const BasicTable = ({ rowHeaders, rowData }: ITableProps) => {
  const renderRowHeaders = () => {
    return rowHeaders.map((header) => {
      return <TableCell align="center">{header}</TableCell>;
    });
  };

  const renderRowData = (row) => {
    return row.map((item: any) => {
      return <TableCell align="center">{item}</TableCell>;
    });
  };

  return (
    <TableContainer component={Card}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>{renderRowHeaders()}</TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row: any, index: number) => (
            <TableRow
              key={`${row}-${index}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {renderRowData(row)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
