"use client";

import React from "react";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

import BasicTable from "../../components/BasicTable";

import Header from "../Header";
import useDashboard from "../useDashboard";
import useUsers from "./useUsers";

import CreateAdminModal from "./CreateAdminModal";

const RegisterUserPage: React.FC<any> = () => {
  const { user } = useDashboard();
  const { state, handlers } = useUsers();

  return (
    <Container key={"users-container"}>
      <Header role={user?.role} />

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
        formatTableData={handlers.formatTableData}
      />
      <BasicTable
        tableKey="admin-user-table"
        rowHeaders={["Name", "email"]}
        rowData={handlers.formatTableData("admin")}
      />

      <Snackbar
        color="primary"
        anchorOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
        open={state.snackbar.open}
        onClose={handlers.handleCloseSnackbar}
        message={state.snackbar.message}
        TransitionComponent={state.snackbar.Transition}
        key={state.snackbar.Transition.name}
        autoHideDuration={1200}
      />
    </Container>
  );
};

export default RegisterUserPage;
