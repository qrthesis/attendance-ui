"use client";

import React from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Header from "../Header";
import BasicTable from "../../components/BasicTable";

import useDashboard from "../useDashboard";
import useEvent from "./useEvent";
import dayjs from "dayjs";

const CreateEventPage: React.FC<any> = () => {
  const { user } = useDashboard();

  const { events, modal, fields, snackbar, handleCreateEvent } = useEvent();

  const { completed, upcoming, inProgress } = events.data;

  console.log("EVENTS AT PAGE", events.data);

  const createModalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const formatTableData = (event: "upcoming" | "completed" | "inProgress") => {
    return events.data[event].map((event: any) => {
      return [
        event.name,
        event.description,
        dayjs(event.date).format("MM/DD/YYYY"),
      ];
    });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          padding: "20px",
        }}
      >
        <Accordion
          sx={{
            width: "100%",
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
            />
          </AccordionDetails>
        </Accordion>

        <Accordion
          defaultExpanded
          sx={{
            width: "100%",
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
            />
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{
            width: "100%",
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
            />
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Fab
          color="primary"
          aria-label="add"
          variant="extended"
          sx={{
            position: "absolute",
            bottom: 20,
            right: 16,
          }}
          onClick={modal.updateVisibility}
        >
          <AddIcon />
          Add new event
        </Fab>
      </Box>
      <Modal
        open={modal.isVisible}
        onClose={modal.updateVisibility}
        aria-labelledby="create-event-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={createModalStyle}>
          <Stack spacing={3} direction="column">
            <Typography
              id="create-event-modal-title"
              variant="h6"
              component="h2"
            >
              Create new school event
            </Typography>
            <TextField
              fullWidth
              type="text"
              id="event-name"
              label="Event Name"
              variant="outlined"
              value={fields.value.name}
              onChange={(e) => fields.handler("name", e.target.value)}
            />
            <TextField
              fullWidth
              type="text"
              id="description"
              label="Event Description"
              variant="outlined"
              value={fields.value.description}
              onChange={(e) => fields.handler("description", e.target.value)}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Event Date"
                value={dayjs(fields.value.date)}
                onChange={(newValue) => fields.handler("date", newValue)}
              />
            </LocalizationProvider>

            <Button onClick={handleCreateEvent} variant="contained">
              Create
            </Button>
          </Stack>
        </Box>
      </Modal>
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
