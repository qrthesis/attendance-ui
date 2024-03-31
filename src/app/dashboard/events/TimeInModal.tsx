import React, {useState} from 'react'

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";

interface ITimeInModalProps {
    isVisible: boolean
    updateVisibility: () => void
    isRenderable: boolean
}

const TimeInModal
: React.FC<ITimeInModalProps> = ({
    isVisible,
    updateVisibility,
    isRenderable
}) => {
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
                <Stack spacing={3} direction="column">
                    <Typography
                        id="time-in-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Are you sure to clock in for the event?
                    </Typography>
                    <Button onClick={() => {}} variant="contained">
                        Cancel
                    </Button>
                    <Button onClick={() => {}} variant="contained">
                        Clock In
                    </Button>
                </Stack>
            </Box>
        </Modal>
    )
}

export default TimeInModal
