import React, { useState } from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import BasicTable from "../../components/BasicTable";
import dayjs from "dayjs";

interface IViewAttendanceModalProps {
  isVisible: boolean;
  updateVisibility: () => void;
  eventDetails: any;
  attendance: Array<any>;
}

const ViewAttendanceModal: React.FC<IViewAttendanceModalProps> = ({
  isVisible,
  updateVisibility,
  eventDetails,
  attendance,
}) => {
  const resetModalStyle = {
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

  const formatTableData = () => {
    return attendance.map((attend: any) => {
      return [
        attend.department,
        attend.course,
        attend.email,
        attend.name,
        dayjs.unix(attend.timeIn).format("MM/DD/YYYY hh:mm A"),
        dayjs.unix(attend.timeOut).format("MM/DD/YYYY hh:mm A"),
      ];
    });
  };

  return (
    <Modal
      open={isVisible}
      onClose={updateVisibility}
      aria-labelledby="view-attendance-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={resetModalStyle}>
        <Stack spacing={3} direction="column">
          <Typography
            id="view-attendance-modal-title"
            variant="h6"
            component="h2"
          >
            {eventDetails?.name}

            <Typography id="view-attendance-modal-description">
              {eventDetails?.description}
            </Typography>
          </Typography>
          {attendance.length > 0 ? (
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
                <Typography variant="h6">Student Attendance</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <BasicTable
                  tableKey="view-attendance-table"
                  rowHeaders={[
                    "Department",
                    "Course",
                    "Email",
                    "Name",
                    "Time in",
                    "Time out",
                  ]}
                  rowData={formatTableData()}
                />
              </AccordionDetails>
            </Accordion>
          ) : (
            <Typography variant="h6">
              No attendance for the event yet
            </Typography>
          )}
        </Stack>
      </Box>
    </Modal>
  );
};

export default ViewAttendanceModal;
