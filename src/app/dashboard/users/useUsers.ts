import React, { useState, useEffect } from "react";

import Fade from "@mui/material/Fade";
import { TransitionProps } from "@mui/material/transitions";

import { createAdmin, getAdmin } from "@/utils/queries/admin";
import { saveAdminUSer } from "@/utils/ducks/reducers/users";

import { useAppDispatch } from "@/utils/ducks/store";
import { useAppSelector } from "@/utils/ducks/store";

import { IAdminUser, ICreateUserModal } from "./types";

const useUser = () => {
  const { admin } = useAppSelector((state) => state.usersSlice);
  const { user: loggedInUser } = useAppSelector((state) => state.authSlice);

  const [adminDetails, setAdminDetails] = useState<IAdminUser>({
    name: "",
    email: "",
    password: "",
  });

  const [modalVisibility, setModalVisibility] = useState<ICreateUserModal>({
    admin: false,
    student: false,
  });

  const [snackbarState, setSnackbarState] = useState<{
    open: boolean;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
    message: string;
  }>({
    open: false,
    Transition: Fade,
    message: "",
  });

  const dispatch = useAppDispatch();

  const formatTableData = (user: "admin" | "student") => {
    if (user === "admin") {
      return admin
        .filter((userAdmin: any) => userAdmin.email !== loggedInUser?.email)
        .map((_admin: any) => [_admin.name, _admin.email]);
    }
  };

  const updateAdminDetails = (key: string, value: string) => {
    return setAdminDetails((prevState: any) => ({
      ...adminDetails,
      [key]: value,
    }));
  };

  const updateModalVisibility = (modalType: "admin" | "student") => {
    return setModalVisibility((prevState: any) => ({
      ...modalVisibility,
      [modalType]: !prevState[modalType],
    }));
  };

  const fetchUsers = async () => {
    const adminUsers = await getAdmin();
    dispatch(saveAdminUSer(adminUsers));
    console.log(adminUsers);
  };

  const addAdmin = async () => {
    const result = await createAdmin(
      adminDetails.name,
      adminDetails.email,
      adminDetails.password
    );
    console.log("result", result);
    if (result?.status === 200) {
      setAdminDetails({
        name: "",
        email: "",
        password: "",
      });
      updateModalVisibility("admin");
      handleOpenSnackbar(result?.message);
      fetchUsers();
    } else {
      handleOpenSnackbar("Event creation failed!!");
    }
  };

  const addStudent = (student: any) => {};

  const handleOpenSnackbar = (message: string) => {
    return setSnackbarState((prevState) => ({
      ...prevState,
      open: true,
      message,
    }));
  };

  const handleCloseSnackbar = () => {
    return setSnackbarState({
      open: false,
      Transition: Fade,
      message: "",
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    state: {
      adminDetails,
      modalVisibility,
      snackbar: snackbarState,
    },
    handlers: {
      updateAdminDetails,
      updateModalVisibility,
      addAdmin,
      addStudent,
      handleCloseSnackbar,
      formatTableData,
    },
  };
};

export default useUser;
