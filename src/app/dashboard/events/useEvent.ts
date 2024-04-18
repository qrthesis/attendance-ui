import React, { useState, useEffect } from "react";
import { useAppDispatch } from "@/utils/ducks/store";

import {
  createEvent,
  getEvents,
  getTimeInStatus,
  getTimeOutStatus,
  getAttendance,
  deleteEventById,
} from "@/utils/queries/events";
import { resetPassword } from "@/utils/queries/user";
import {
  saveEvents,
  saveAttendance,
  updateFetchingState,
} from "@/utils/ducks/reducers/events";
import { useAppSelector } from "@/utils/ducks/store";

import dayjs from "dayjs";

import Fade from "@mui/material/Fade";
import { TransitionProps } from "@mui/material/transitions";

const useEvent = () => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<any>();

  const { events, attendance, isFetching } = useAppSelector(
    (state) => state.eventsSlice
  );

  const [isCreateEventModalVisible, setIsCreateModalVisible] =
    useState<boolean>(false);
  const [isResetPasswordModalVisible, setIsResetPasswordModalVisible] =
    useState<boolean>(false);
  const [isTimeInModalVisible, setIsTimeInModalVisible] =
    useState<boolean>(false);
  const [isTimeOutModalVisible, setIsTimeOutModalVisible] =
    useState<boolean>(false);
  const [isViewAttendanceModalVisible, setIsViewAttendanceModalVisible] =
    useState<boolean>(false);

  const [createEventFields, setCreateEventFields] = useState({
    name: "",
    description: "",
    timeIn: "",
    timeOut: "",
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

  const handleOpenSnackbar = (
    message: string,
    severity: "success" | "error"
  ) => {
    return setSnackbarState((prevState) => ({
      ...prevState,
      open: true,
      message,
      severity,
    }));
  };

  const handleCloseSnackbar = () => {
    return setSnackbarState({
      open: false,
      Transition: Fade,
      message: "",
    });
  };

  const handleCreateEventFieldChange = (key: string, value: any) => {
    setCreateEventFields((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleCreateEvent = async () => {
    const result = await createEvent(
      createEventFields.name,
      createEventFields.description,
      dayjs(createEventFields.timeIn).unix(),
      dayjs(createEventFields.timeOut).unix()
    );

    if (result?.status === 200) {
      setCreateEventFields({
        name: "",
        description: "",
        timeIn: "",
        timeOut: "",
      });
      setIsCreateModalVisible((prevState) => !prevState);
      handleOpenSnackbar(result?.message, "success");
      fetchEvents();
    } else {
      handleOpenSnackbar("Event creation failed!!", "error");
    }
  };

  const deleteEvent = async (rowData: any) => {
    const selectedEvent = [
      ...events.upcoming,
      ...events.completed,
      ...events.inProgress,
    ].filter((event: any) => event.name === rowData[0]);
    const result = await deleteEventById(selectedEvent[0]._id);

    if (result?.status !== 200) {
      return handleOpenSnackbar("User deletion failed!!", "error");
    }

    handleOpenSnackbar(result?.data?.message, "success");
    fetchEvents();
  };

  const fetchEvents = async () => {
    const events = await getEvents();

    dispatch(
      updateFetchingState({
        key: "events",
        value: true,
      })
    );
    dispatch(saveEvents(events));
    setTimeout(() => {
      dispatch(
        updateFetchingState({
          key: "events",
          value: false,
        })
      );
    }, 1500);
  };

  const fetchAttendance = async (eventId: string) => {
    const fetchedAttendance = await getAttendance(eventId);
    dispatch(
      updateFetchingState({
        key: "attendance",
        value: true,
      })
    );

    dispatch(saveAttendance(fetchedAttendance));
    setTimeout(() => {
      dispatch(
        updateFetchingState({
          key: "attendance",
          value: false,
        })
      );
    }, 2000);
  };

  const handleResetPassword = async (
    newPassword: string,
    oldPassword: string
  ) => {
    const result = await resetPassword(user.email, oldPassword, newPassword);

    if (result?.status === 200) {
      const updatedUser = result?.data?.user;
      delete updatedUser.password;

      setIsResetPasswordModalVisible((prevState) => !prevState);
      handleOpenSnackbar(result?.data?.message, "success");
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } else {
      handleOpenSnackbar("Reset password failed!!", "error");
    }
  };

  useEffect(() => {
    const savedUser: any = JSON.parse(localStorage.getItem("user")!);
    setUser(savedUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchEvents();
  }, []);

  useEffect(() => {
    setIsResetPasswordModalVisible(user?.loginCount === 0);
  }, [user?.loginCount]);

  return {
    modal: {
      create: {
        isVisible: isCreateEventModalVisible,
        updateVisibility: () =>
          setIsCreateModalVisible((prevState) => !prevState),
      },
      reset: {
        isVisible: isResetPasswordModalVisible,
        updateVisibility: () =>
          setIsResetPasswordModalVisible((prevState) => !prevState),
      },
      timeIn: {
        isVisible: isTimeInModalVisible,
        updateVisibility: () =>
          setIsTimeInModalVisible((prevState) => !prevState),
        checkTimeInStatus: async (eventId: string) => {
          const message = await getTimeInStatus(eventId, user.email);

          if (message === "Event hasn't started yet") {
            return handleOpenSnackbar(
              "Too early to time in! Event hasn't started yet",
              "error"
            );
          }
          setIsTimeInModalVisible((prevState) => !prevState);
        },
      },
      timeOut: {
        isVisible: isTimeOutModalVisible,
        updateVisibility: () =>
          setIsTimeOutModalVisible((prevState) => !prevState),
        checkTimeOutStatus: async (eventId: string) => {
          const message = await getTimeOutStatus(eventId, user.email);

          if (message === "Too early to time out!!") {
            return handleOpenSnackbar(
              "Too early to time out!! Event hasn't ended yet",
              "error"
            );
          } else if (message === "Student hasn't time in yet") {
            return handleOpenSnackbar(
              "Student hasn't time in yet!!Time in first!!",
              "error"
            );
          } else if (message === "Event hasn't started yet") {
            return handleOpenSnackbar("Event hasn't started yet!!", "error");
          } else if (message === "Student already timed out") {
            return handleOpenSnackbar("Student already timed out!!", "error");
          }
          setIsTimeOutModalVisible((prevState) => !prevState);
        },
      },
      viewAttendance: {
        isVisible: isViewAttendanceModalVisible,
        updateVisibility: () =>
          setIsViewAttendanceModalVisible((prevState) => !prevState),
        fetchAttendance,
      },
    },
    fields: {
      value: createEventFields,
      handler: handleCreateEventFieldChange,
    },
    snackbar: {
      isVisible: snackbarState.open,
      message: snackbarState.message,
      onClose: handleCloseSnackbar,
      transition: snackbarState.Transition,
    },
    handleCreateEvent,
    events: {
      data: {
        ...events,
      },
      isFetching: isFetching.events,
    },
    attendance: {
      data: attendance,
      isFetching: isFetching.attendance,
    },
    handleResetPassword,
    user,
    deleteEvent,
  };
};

export default useEvent;
