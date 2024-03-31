import React, { useState, useEffect } from "react";
import { useAppDispatch } from "@/utils/ducks/store";

import { createEvent, getEvents } from "@/utils/queries/events";
import { resetPassword } from "@/utils/queries/user";
import { saveEvents } from "@/utils/ducks/reducers/events";
import { useAppSelector } from "@/utils/ducks/store";

import dayjs from "dayjs";

import Fade from "@mui/material/Fade";
import { TransitionProps } from "@mui/material/transitions";

const useEvent = () => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<any>();

  const { events } = useAppSelector((state) => state.eventsSlice);

  const [isCreateEventModalVisible, setIsCreateModalVisible] =
    useState<boolean>(false);
  const [isResetPasswordModalVisible, setIsResetPasswordModalVisible] =
    useState<boolean>(user?.loginCount === 0);
    const [isTimeInModalVisible, setIsTimeInModalVisible] =
    useState<boolean>(false);

  const [createEventFields, setCreateEventFields] = useState({
    name: "",
    description: "",
    date: "",
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
    setCreateEventFields((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleCreateEvent = async () => {
    const result = await createEvent(
      createEventFields.name,
      createEventFields.description,
      dayjs(createEventFields.date).unix()
    );

    if (result?.status === 200) {
      setCreateEventFields({
        name: "",
        description: "",
        date: "",
      });
      setIsCreateModalVisible((prevState) => !prevState);
      handleOpenSnackbar(result?.message);
      fetchEvents();
    } else {
      handleOpenSnackbar("Event creation failed!!");
    }
  };

  const fetchEvents = async () => {
    const events = await getEvents();

    dispatch(saveEvents(events));
    console.log(events);
  };

  const handleResetPassword = async (newPassword: string, oldPassword: string) => {
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
  }

  useEffect(() => {
    const savedUser: any = JSON.parse(localStorage.getItem("user")!);
    setUser(savedUser)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchEvents();
  }, []);


  return {
    modal: {
      create: {
        isVisible: isCreateEventModalVisible,
        updateVisibility: () =>
          setIsCreateModalVisible((prevState) => !prevState),
      },
      reset: {
        isVisible: isResetPasswordModalVisible,
        updateVisibility: () => setIsResetPasswordModalVisible((prevState) => !prevState),
      },
      timeIn: {
        isVisible: isTimeInModalVisible,
        updateVisibility: () => setIsTimeInModalVisible(prevState => !prevState),
      }
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
    handleResetPassword,
    user
  };
};

export default useEvent;
