import React, { Fragment, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import TablePagination from "@mui/material/TablePagination";
import DeleteIcon from "@mui/icons-material/Delete";
import Skeleton from "@mui/material/Skeleton";

import { ITableProps } from "./types";

const BasicTable = ({
  tableKey,
  rowHeaders,
  rowData,
  user,
  actions,
}: ITableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  const renderActions = (row: any) => {
    if (user?.role !== "admin" && tableKey === "inprogress-events-table") {
      return (
        <Fragment>
          <TableCell
            key={`${tableKey}-actions-clock-in`}
            align="center"
            sx={{
              cursor: "pointer",
              ":hover": {
                color: "blue",
                fontWeight: "bold",
                backgroundColor: "lightgray",
              },
            }}
            onClick={() => actions?.timeIn?.callback?.(row)}
          >
            Clock in
          </TableCell>
          <TableCell
            key={`${tableKey}-actions-clock-out`}
            align="center"
            sx={{
              cursor: "pointer",
              ":hover": {
                color: "blue",
                fontWeight: "bold",
                backgroundColor: "lightgray",
              },
            }}
            onClick={() => actions?.timeOut?.callback?.(row)}
          >
            Clock out
          </TableCell>
        </Fragment>
      );
    }
    if (user?.role !== "admin" && actions?.viewAttendance) {
      return (
        <Fragment>
          <TableCell
            key={`${tableKey}-actions-view-attendance`}
            align="center"
            sx={{
              cursor: "pointer",
              ":hover": {
                color: "blue",
                fontWeight: "bold",
                backgroundColor: "lightgray",
              },
            }}
            onClick={() => actions?.viewAttendance?.callback?.(row)}
          >
            View Attendance
          </TableCell>
        </Fragment>
      );
    }

    if (user?.role === "admin" && actions?.viewAttendance) {
      return (
        <Fragment>
          <TableCell
            key={`${tableKey}-actions-view-attendance`}
            align="center"
            sx={{
              cursor: "pointer",
              ":hover": {
                color: "blue",
                fontWeight: "bold",
                backgroundColor: "lightgray",
              },
            }}
            onClick={() => actions?.viewAttendance?.callback?.(row)}
          >
            View Attendance
          </TableCell>
          <TableCell key={`${tableKey}-actions-delete-user`} align="center">
            <DeleteIcon
              sx={{
                cursor: "pointer",
                ":hover": {
                  color: "red",
                  fontWeight: "bold",
                },
              }}
              onClick={() => actions?.delete?.callback?.(row)}
            />
          </TableCell>
        </Fragment>
      );
    }

    if (
      user?.role === "admin" &&
      (tableKey === "student-user-table" || tableKey === "admin-user-table")
    ) {
      return (
        <Fragment>
          <TableCell
            key={`${tableKey}-actions-delet-user`}
            align="center"
            sx={{}}
            onClick={() => actions?.viewAttendance?.callback?.(row)}
          >
            <DeleteIcon
              sx={{
                cursor: "pointer",
                ":hover": {
                  color: "red",
                  fontWeight: "bold",
                },
              }}
              onClick={() => actions?.delete?.callback?.(row)}
            />
          </TableCell>
        </Fragment>
      );
    }
  };

  const renderTableBody = () => {
    return rowData && rowData.length! > 0 ? (
      rowData
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row: any, index: number) => (
          <Fragment key={`${tableKey}-}-table-body-row-${index}`}>
            <TableRow
              key={`${row}-${index}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {renderRowData(row)}
              {renderActions(row)}
            </TableRow>
          </Fragment>
        ))
    ) : (
      <TableRow key={`${tableKey}-empty-row`}>
        <TableCell
          key={`${tableKey}-empty-cell`}
          align="center"
          colSpan={rowHeaders.length}
        >
          No data
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Fragment>
      <TableContainer component={Card} key={`table-container-${tableKey}`}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          key={`table-${tableKey}`}
          id={`table-${tableKey}`}
        >
          <TableHead>
            <TableRow key={`${tableKey}-table-head-row`}>
              {renderRowHeaders()}
            </TableRow>
          </TableHead>
          <TableBody key={`${tableKey}-table-body-row`}>
            {renderTableBody()}
          </TableBody>
        </Table>
      </TableContainer>

      {rowData?.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowData?.length!}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Fragment>
  );
};

export default BasicTable;
