import React from "react";
import dayjs from "dayjs";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

interface ICreateEventModalProps {
  isVisible: boolean;
  updateVisibility: () => void;
  fields: any;
  handleCreateEvent: () => void;
}

const CreateEventModal: React.FC<ICreateEventModalProps> = ({
  isVisible,
  updateVisibility,
  fields,
  handleCreateEvent,
}) => {
  const createModalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={isVisible}
      onClose={updateVisibility}
      aria-labelledby="create-event-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={createModalStyle}>
        <Stack spacing={3} direction="column">
          <Typography id="create-event-modal-title" variant="h6" component="h2">
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
            <Stack
              spacing={3}
              direction="row"
              sx={{
                display: "flex",
                width: "100%",
              }}
            >
              <DatePicker
                label="Event Date"
                value={dayjs(fields.value.date)}
                onChange={(newValue) => fields.handler("date", newValue)}
              />
              <TimePicker
                label="Time in"
                onChange={(timeIn) => fields.handler("timeIn", timeIn)}
              />
              <TimePicker
                label="Time out"
                onChange={(timeOut) => fields.handler("timeOut", timeOut)}
              />
            </Stack>
          </LocalizationProvider>

          <Button onClick={handleCreateEvent} variant="contained">
            Create
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CreateEventModal;
