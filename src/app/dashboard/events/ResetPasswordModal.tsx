import React, {useState} from 'react'

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

interface IResetPasswordModalProps {
    isVisible: boolean
    updateVisibility: () => void
    handleResetPassword: (newPassword: string, oldPassword: string) => void
}

const ResetPasswordModal: React.FC<IResetPasswordModalProps> = ({
    isVisible,
    updateVisibility,
    handleResetPassword
}) => {

    const [newPassword, setNewPassword] = useState<string>("");
    const [oldPassword, setOldPassword] = useState<string>("");

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

    const updatePassword = () => {
        handleResetPassword(newPassword, oldPassword);
        setNewPassword("");
        setOldPassword("");
    }

    return (
        <Modal
            open={isVisible}
            onClose={updateVisibility}
            aria-labelledby="create-event-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={resetModalStyle}>
                <Stack spacing={3} direction="column">
                    <Typography
                        id="create-event-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Reset password
                    </Typography>
                    <TextField
                        fullWidth
                        type="text"
                        id="newPassword"
                        label="New Password"
                        variant="outlined"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        type="text"
                        id="oldPassword"
                        label="Old Password"
                        variant="outlined"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <Button onClick={updatePassword} variant="contained">
                        Confirm reset
                    </Button>
                </Stack>
            </Box>
        </Modal>
    )
}

export default ResetPasswordModal