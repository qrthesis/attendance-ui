import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import { useQRCode } from "next-qrcode";
import dayjs from "dayjs";

interface ITimeInModalProps {
  isVisible: boolean;
  updateVisibility: () => void;
  isRenderable: boolean;
  user: string;
  eventId: string;
}

const TimeInModal: React.FC<ITimeInModalProps> = ({
  isVisible,
  updateVisibility,
  isRenderable,
  user,
  eventId,
}) => {
  const { Canvas } = useQRCode();

  if (!isRenderable) {
    return null;
  }

  const timeInModalStyle = {
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
      aria-labelledby="time-in-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={timeInModalStyle}>
        <Stack
          spacing={3}
          direction="column"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            id="time-in-modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
          >
            Are you sure to clock in for the event?
          </Typography>

          <Canvas
            text={`${user}!${eventId}`}
            options={{
              errorCorrectionLevel: "M",
              margin: 3,
              scale: 4,
              width: 200,
              color: {
                dark: "#010599FF",
                light: "#FFBF60FF",
              },
            }}
          />
        </Stack>
      </Box>
    </Modal>
  );
};

export default TimeInModal;
