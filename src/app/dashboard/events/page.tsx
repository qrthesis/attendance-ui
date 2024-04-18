"use client";
import React from "react";
import dayjs from "dayjs";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import BasicTable from "../../components/BasicTable";

import useEvent from "./useEvent";

import CreateEventModal from "./CreateEventModal";
import ResetPasswordModal from "./ResetPasswordModal";
import TimeInModal from "./TimeInModal";
import TimeOutModal from "./TimeOutModal";
import ViewAttendanceModal from "./ViewAttendanceModal";

const CreateEventPage: React.FC<any> = () => {
  const {
    events,
    modal,
    fields,
    snackbar,
    handleCreateEvent,
    handleResetPassword,
    user,
    attendance,
    deleteEvent,
  } = useEvent();

  const [selectedEventId, setSelectedEventId] = React.useState<string>("");
  const [selectedEvent, setSelectedEvent] = React.useState<any>({});

  const formatTableData = (event: "upcoming" | "completed" | "inProgress") => {
    return events.data[event].map((event: any) => {
      return [
        event.name,
        event.description,
        dayjs.unix(event.timeIn).format("MM/DD/YYYY hh:mm A"),
      ];
    });
  };

  const timeIn = (row: any) => {
    const selectedEvent = events.data["inProgress"].find(
      (event) => event.name === row[0]
    );
    modal.timeIn.checkTimeInStatus(selectedEvent._id);

    setSelectedEventId(selectedEvent._id);
  };

  const timeOut = (row: any) => {
    const selectedEvent = events.data["inProgress"].find(
      (event) => event.name === row[0]
    );

    modal.timeOut.checkTimeOutStatus(selectedEvent._id);

    setSelectedEventId(selectedEvent._id);
  };

  const viewAttendance = (row: any) => {
    const mergedEvents = events.data["inProgress"].concat(
      events.data["completed"]
    );

    const selectedEvent = mergedEvents.find((event) => event.name === row[0]);

    if (user?.role === "admin") {
      modal.viewAttendance.fetchAttendance(selectedEvent._id);
    } else {
      modal.viewAttendance.fetchStudentAttendance(
        selectedEvent._id,
        user?.email
      );
    }

    modal.viewAttendance.updateVisibility();
    setSelectedEvent(selectedEvent);
  };

  return (
    <>
      <Stack
        sx={{
          display: "flex",
          flexWrap: "wrap",
          padding: "20px",
        }}
        spacing={3}
      >
        <Accordion
          sx={{
            width: "100%",
            border: "1px solid #000",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6">Upcoming Events</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <BasicTable
              tableKey="upcoming-events-table"
              rowHeaders={["Name", "Description", "Date"]}
              rowData={formatTableData("upcoming")}
              user={user}
              actions={{
                delete: {
                  callback: deleteEvent,
                },
              }}
              isFetching={events.isFetching}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion
          defaultExpanded
          sx={{
            width: "100%",
            border: "1px solid #000",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6">In Progress Events</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <BasicTable
              tableKey="inprogress-events-table"
              rowHeaders={["Event Name", "Description", "Date"]}
              rowData={formatTableData("inProgress")}
              user={user}
              actions={{
                timeIn: {
                  callback: timeIn,
                  disabled: false,
                },
                timeOut: {
                  callback: timeOut,
                  disabled: false,
                },
                viewAttendance: {
                  callback: viewAttendance,
                },
                delete: {
                  callback: deleteEvent,
                },
              }}
              isFetching={events.isFetching}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{
            width: "100%",
            border: "1px solid #000",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6">Completed Events</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <BasicTable
              tableKey="completed-events-table"
              rowHeaders={["Name", "Description", "Date"]}
              rowData={formatTableData("completed")}
              user={user}
              actions={{
                viewAttendance: {
                  callback: viewAttendance,
                },
                delete: {
                  callback: deleteEvent,
                },
              }}
              isFetching={events.isFetching}
            />
          </AccordionDetails>
        </Accordion>

        {user?.role === "admin" && (
          <Button onClick={modal.create.updateVisibility} variant="contained">
            Add new event
          </Button>
        )}
      </Stack>

      <CreateEventModal
        fields={fields}
        handleCreateEvent={handleCreateEvent}
        isVisible={modal.create.isVisible}
        updateVisibility={modal.create.updateVisibility}
      />
      <ResetPasswordModal
        isVisible={modal.reset.isVisible}
        updateVisibility={modal.reset.updateVisibility}
        handleResetPassword={handleResetPassword}
      />
      <TimeInModal
        isVisible={modal.timeIn.isVisible}
        updateVisibility={modal.timeIn.updateVisibility}
        isRenderable={user?.role !== "admin"}
        user={user?.email}
        eventId={selectedEventId}
      />
      <TimeOutModal
        isVisible={modal.timeOut.isVisible}
        updateVisibility={modal.timeOut.updateVisibility}
        isRenderable={user?.role !== "admin"}
        user={user?.email}
        eventId={selectedEventId}
      />

      <ViewAttendanceModal
        isVisible={modal.viewAttendance.isVisible}
        updateVisibility={modal.viewAttendance.updateVisibility}
        eventDetails={selectedEvent}
        attendance={attendance.data}
        isFetching={attendance.isFetching}
        user={user}
      />

      <Snackbar
        color="primary"
        anchorOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
        open={snackbar.isVisible}
        onClose={snackbar.onClose}
        message={snackbar.message}
        TransitionComponent={snackbar.transition}
        key={snackbar.transition.name}
        autoHideDuration={1200}
      />
    </>
  );
};

export default CreateEventPage;
