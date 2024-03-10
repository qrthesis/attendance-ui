import React, { Fragment } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import TablePagination from "@mui/material/TablePagination";

import { ITableProps } from "./types";

const BasicTable = ({ tableKey, rowHeaders, rowData }: ITableProps) => {
  const renderRowHeaders = () => {
    return rowHeaders.map((header: string, index: number) => {
      return (
        <Fragment key={`${tableKey}-${header}-${index}`}>
          <TableCell key={`${tableKey}-${header}-${index}`} align="center">
            {header}
          </TableCell>
        </Fragment>
      );
    });
  };

  const renderRowData = (row: any) => {
    return row.map((item: string, index: number) => {
      return (
        <Fragment key={`${tableKey}-${item}-${index}`}>
          <TableCell key={`${tableKey}-${item}-${index}`} align="center">
            {item}
          </TableCell>
        </Fragment>
      );
    });
  };

  return (
    <Fragment>
      <TableContainer component={Card} key={`table-container-${tableKey}`}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          key={`table-${tableKey}`}
        >
          <TableHead>
            <TableRow key={`${tableKey}-table-head-row`}>
              {renderRowHeaders()}
            </TableRow>
          </TableHead>
          <TableBody key={`${tableKey}-table-body-row`}>
            {rowData.map((row: any, index: number) => (
              <Fragment key={`${tableKey}-}-table-body-row-${index}`}>
                <TableRow
                  key={`${row}-${index}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {renderRowData(row)}
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={5}
        rowsPerPage={5}
        page={0}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </Fragment>
  );
};

export default BasicTable;
