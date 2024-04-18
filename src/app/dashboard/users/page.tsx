"use client";

import React from "react";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import BasicTable from "../../components/BasicTable";

import useUsers from "./useUsers";

import CreateAdminModal from "./CreateAdminModal";
import CreateStudentModal from "./CreateStudentModal";

const UsersPage: React.FC<any> = () => {
  const { state, handlers } = useUsers();

  return (
    <Container key={"users-container"}>
      <Stack spacing={3} direction="column">
        <Button
          onClick={() => handlers.updateModalVisibility("admin")}
          variant="contained"
        >
          Create co-admin
        </Button>
        <CreateAdminModal
          isVisible={state.modalVisibility.admin}
          updateVisibility={handlers.updateModalVisibility}
          adminUser={state.adminDetails}
          updateAdminDetails={handlers.updateAdminDetails}
          addAdmin={handlers.addAdmin}
        />
        <BasicTable
          tableKey="admin-user-table"
          rowHeaders={["Email", "Name"]}
          rowData={handlers.formatTableData("admin")}
          user={state.savedUser}
          actions={{
            delete: {
              callback: handlers.deleteUser,
            },
          }}
        />

        <Button
          onClick={() => handlers.updateModalVisibility("student")}
          variant="contained"
        >
          Create student
        </Button>
        <BasicTable
          tableKey="student-user-table"
          rowHeaders={[
            "Email",
            "Name",
            "Department",
            "Course",
            "Default Password",
          ]}
          rowData={handlers.formatTableData("student")}
          user={state.savedUser}
          actions={{
            delete: {
              callback: handlers.deleteUser,
            },
          }}
          isFetching={state.isFetching}
        />

        <CreateStudentModal
          isVisible={state.modalVisibility.student}
          updateVisibility={handlers.updateModalVisibility}
          studentUser={state.studentDetails}
          updateStudentDetails={handlers.updateStudentDetails}
          addStudent={handlers.addStudent}
        />

        <Snackbar
          color="primary"
          anchorOrigin={{
            horizontal: "center",
            vertical: "top",
          }}
          open={state.snackbar.open}
          onClose={handlers.handleCloseSnackbar}
          TransitionComponent={state.snackbar.Transition}
          key={state.snackbar.Transition.name}
          autoHideDuration={2000}
        >
          <Alert
            onClose={handlers.handleCloseSnackbar}
            severity={state.snackbar.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {state.snackbar.message}
          </Alert>
        </Snackbar>
      </Stack>
    </Container>
  );
};

export default UsersPage;
