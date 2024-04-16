import React, { useState, useEffect, use } from "react";

import Fade from "@mui/material/Fade";
import { TransitionProps } from "@mui/material/transitions";

import { createAdmin, getAdmin } from "@/utils/queries/admin";
import { createStudent, getStudents } from "@/utils/queries/students";
import { deleteUserById } from "@/utils/queries/user";


import { saveAdminUser, saveStudentUsers } from "@/utils/ducks/reducers/users";

import { useAppDispatch } from "@/utils/ducks/store";
import { useAppSelector } from "@/utils/ducks/store";

import { IAdminUser, IStudentUser } from "./types";

const useUser = () => {
  const { admin, students } = useAppSelector((state) => state.usersSlice);
  const { user: loggedInUser } = useAppSelector((state) => state.authSlice);
  
  const [savedUser, setSavedUser] = useState<any>();

  const [adminDetails, setAdminDetails] = useState<IAdminUser>({
    name: "",
    email: "",
  });

  const [studentDetails, setStudentDetails] = useState<IStudentUser>({
    name: "",
    email: "",
    department: "CTECH",
    course: "",
  });

  const [modalVisibility, setModalVisibility] = useState<{
    admin: boolean;
    student: boolean;
  }>({
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
    severity?: "success" | "error";
  }>({
    open: false,
    Transition: Fade,
    message: "",
    severity: "success",
  });

  const dispatch = useAppDispatch();

  const formatTableData = (user: "admin" | "student") => {
    if (user === "admin") {
      return admin
        .filter((userAdmin: any) => userAdmin.email !== loggedInUser?.email)
        .map((_admin: any) => [_admin.email, _admin.name]);
    } else {
      return students.map((student: any) => [
        student.email,
        student.name,
        student.department,
        student.course,
        student.password ?  atob(student.password): "",
      ]);
    }
  };

  const updateAdminDetails = (key: string, value: string) => {
    return setAdminDetails((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const updateStudentDetails = (key: string, value: string) => {
    return setStudentDetails((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const updateModalVisibility = (userType: "admin" | "student") => {
    return setModalVisibility((prevState: any) => ({
      ...prevState,
      [userType]: !prevState[userType],
    }));
  };

  const fetchUsers = async () => {
    const adminUsers = await getAdmin();
    dispatch(saveAdminUser(adminUsers));

    const studentUsers = await getStudents();
    dispatch(saveStudentUsers(studentUsers));
  };

  const addAdmin = async () => {
    const result = await createAdmin(
      adminDetails.name,
      adminDetails.email,
    );
    if (result?.status === 200) {
      setAdminDetails({
        name: "",
        email: "",
      });
      updateModalVisibility("admin");
      handleOpenSnackbar(result?.message, "success");
      fetchUsers();
    } else {
      handleOpenSnackbar("Event creation failed!!", "error");
    }
  };

  const addStudent = async () => {
    const result = await createStudent(
      studentDetails.name,
      studentDetails.email,
      studentDetails.department,
      studentDetails.course,
    );
    if (result?.status !== 200) {
      return handleOpenSnackbar(result?.data?.message, "error");
    }

    setStudentDetails({
      name: "",
      email: "",
      department: "CTECH",
      course: "",
    });
    updateModalVisibility("student");
    handleOpenSnackbar(result?.data?.message, "success");
    fetchUsers();
  };

  const deleteUser = async (rowData: any) => {
    const selectedUser = [...students, ...admin].filter((user: any) => user.email === rowData[0]);
    const result = await deleteUserById(selectedUser[0]._id);

    if (result?.status !== 200) {
      return handleOpenSnackbar("User deletion failed!!", "error");
    } 

    handleOpenSnackbar(result?.data?.message, "success");
    fetchUsers();
  }

  const handleOpenSnackbar = (message: string, severity: "success" | "error") => {
    return setSnackbarState((prevState) => ({
      ...prevState,
      open: true,
      message,
      severity
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
    const loggedInUser: any = JSON.parse(localStorage.getItem("user")!);
    setSavedUser(loggedInUser)
    fetchUsers();
  }, []);

  return {
    state: {
      adminDetails,
      modalVisibility,
      snackbar: snackbarState,
      studentDetails,
      savedUser,
    },
    handlers: {
      updateAdminDetails,
      updateModalVisibility,
      addAdmin,
      addStudent,
      handleCloseSnackbar,
      formatTableData,
      updateStudentDetails,
      deleteUser
    },
  };
};

export default useUser;
