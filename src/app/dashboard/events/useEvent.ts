import React, { useState, useEffect } from "react";
import { useAppDispatch } from "@/utils/ducks/store";

import {
  createEvent,
  getEvents,
  getStudentEvents,
  getTimeInStatus,
  getTimeOutStatus,
  getAttendance,
  deleteEventById
} from "@/utils/queries/events";
import { resetPassword } from "@/utils/queries/user";
import { saveEvents, saveAttendance } from "@/utils/ducks/reducers/events";
import { useAppSelector } from "@/utils/ducks/store";

import dayjs from "dayjs";

import Fade from "@mui/material/Fade";
import { TransitionProps } from "@mui/material/transitions";

const useEvent = () => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<any>();

  const { events, attendance } = useAppSelector((state) => state.eventsSlice);

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
  }>({
    open: false,
    Transition: Fade,
    message: "",
  });

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

  const handleCreateEventFieldChange = (key: string, value: any) => {
    console.log(key, value);
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
      handleOpenSnackbar(result?.message);
      fetchEvents();
    } else {
      handleOpenSnackbar("Event creation failed!!");
    }
  };

  const deleteEvent = async (rowData: any) => {

    const selectedEvent = [...events.upcoming, ...events.completed, ...events.inProgress].filter((event: any) => event.name === rowData[0]);
    console.log('RowData: ', selectedEvent)

    const result = await deleteEventById(selectedEvent[0]._id);
    console.log("users", selectedEvent[0], result);

    if (result?.status !== 200) {
      return handleOpenSnackbar("User deletion failed!!");
    } 

    handleOpenSnackbar(result?.data?.message);
    fetchEvents();
  }


  const fetchEvents = async () => {
    const events = await getEvents();

    dispatch(saveEvents(events));
    console.log(events);
  };

  const fetchAttendance = async (eventId: string) => {
    const attendance = await getAttendance(eventId);
    dispatch(saveAttendance(attendance));
    console.log(attendance);
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
      handleOpenSnackbar(result?.data?.message);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } else {
      handleOpenSnackbar("Reset password failed!!");
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
              "Too early to time in! Event hasn't started yet"
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

          console.log("MESSAGE", message);

          if (message === "Too early to time out!!") {
            return handleOpenSnackbar(
              "Too early to time out!! Event hasn't ended yet"
            );
          } else if (message === "Student hasn't time in yet") {
            return handleOpenSnackbar(
              "Student hasn't time in yet!!Time in first!!"
            );
          } else if (message === "Event hasn't started yet") {
            return handleOpenSnackbar("Event hasn't started yet!!");
          } else if (message === "Student already timed out") {
            return handleOpenSnackbar("Student already timed out!!");
          }
          setIsTimeInModalVisible((prevState) => !prevState);
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
    },
    attendance,
    handleResetPassword,
    user,
    deleteEvent
  };
};

export default useEvent;
