import React, { useState, useEffect } from "react";

import Fade from "@mui/material/Fade";
import { TransitionProps } from "@mui/material/transitions";

import { createAdmin, getAdmin } from "@/utils/queries/admin";
import { createStudent, getStudents } from "@/utils/queries/students";

import { saveAdminUser, saveStudentUsers } from "@/utils/ducks/reducers/users";

import { useAppDispatch } from "@/utils/ducks/store";
import { useAppSelector } from "@/utils/ducks/store";

import { IAdminUser, IStudentUser } from "./types";

const useUser = () => {
  const { admin, students } = useAppSelector((state) => state.usersSlice);
  const { user: loggedInUser } = useAppSelector((state) => state.authSlice);

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
    console.log(adminUsers);

    const studentUsers = await getStudents();
    dispatch(saveStudentUsers(studentUsers));
    console.log(studentUsers);
  };

  const addAdmin = async () => {
    const result = await createAdmin(
      adminDetails.name,
      adminDetails.email,
    );
    console.log("result", result);
    if (result?.status === 200) {
      setAdminDetails({
        name: "",
        email: "",
      });
      updateModalVisibility("admin");
      handleOpenSnackbar(result?.message);
      fetchUsers();
    } else {
      handleOpenSnackbar("Event creation failed!!");
    }
  };

  const addStudent = async () => {
    const result = await createStudent(
      studentDetails.name,
      studentDetails.email,
      studentDetails.department,
      studentDetails.course,
    );
    console.log("result", result);
    if (result?.status === 200) {
      setStudentDetails({
        name: "",
        email: "",
        department: "CTECH",
        course: "",
      });
      updateModalVisibility("student");
      handleOpenSnackbar(result?.message);
      fetchUsers();
    } else {
      handleOpenSnackbar("Event creation failed!!");
    }
  };

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
      studentDetails,
    },
    handlers: {
      updateAdminDetails,
      updateModalVisibility,
      addAdmin,
      addStudent,
      handleCloseSnackbar,
      formatTableData,
      updateStudentDetails,
    },
  };
};

export default useUser;
