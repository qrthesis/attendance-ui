import React from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

import { ICreateStudentModalProps } from "./types";

const CreateStudentModal = ({
  isVisible,
  updateVisibility,
  studentUser,
  updateStudentDetails,
  addStudent,
}: ICreateStudentModalProps) => {
  const [isPasswordVisible, setIsPasswordVisible] =
    React.useState<boolean>(false);

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

  return (
    <Modal
      key={"admin-modal"}
      open={isVisible}
      onClose={() => updateVisibility("student")}
      aria-labelledby="create-event-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={createModalStyle}>
        <Stack spacing={3} direction="column">
          <Typography id="create-admin-modal-title" variant="h6" component="h2">
            Create student user
          </Typography>
          <TextField
            fullWidth
            type="text"
            id="student-name"
            label="Student Name"
            variant="outlined"
            value={studentUser.name}
            onChange={(e) => updateStudentDetails("name", e.target.value)}
          />
          <TextField
            fullWidth
            type="email"
            id="email"
            label="Student Email"
            variant="outlined"
            value={studentUser.email}
            onChange={(e) => updateStudentDetails("email", e.target.value)}
          />

          <TextField
            fullWidth
            type="email"
            id="email"
            label="Student Course"
            variant="outlined"
            value={studentUser.course}
            onChange={(e) => updateStudentDetails("course", e.target.value)}
          />

          <FormControl sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              fullWidth
              type={isPasswordVisible ? "password" : "text"}
              id="password"
              label="Password"
              value={studentUser.password}
              onChange={(e) => updateStudentDetails("password", e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      setIsPasswordVisible((prevState) => !prevState)
                    }
                    edge="end"
                  >
                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button onClick={addStudent} variant="contained">
            Create
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CreateStudentModal;
