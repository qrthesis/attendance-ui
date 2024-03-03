'use client'

import React from 'react'

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

import Header from '../Header'

import useDashboard from '../useDashboard'
import useEvent from './useEvent';
import dayjs from 'dayjs';


const CreateEventPage: React.FC<any> = () => {
  const { user } = useDashboard()

  const { modal , fields, snackbar, handleCreateEvent} = useEvent()

  console.log('USER HERE: ', user)

  
  const createModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Header role={ user?.role}/>
      <Box   sx={{
        display: 'flex',
        flexWrap: 'wrap',
      }}>
        <Fab 
          color="primary"
          aria-label="add"
          variant='extended'
          sx={{
            position: 'absolute',
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
            onChange={(e) => fields.handler('name', e.target.value)}
          />
            <TextField
            fullWidth
            type="text"
            id="description"
            label="Event Description"
            variant="outlined"
            value={fields.value.description}
            onChange={(e) => fields.handler('description', e.target.value)}
          />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Event Date" 
                value={dayjs(fields.value.date)}
                onChange={(newValue) => fields.handler('date', newValue)}
              />
            </LocalizationProvider>
            
          <Button onClick={handleCreateEvent} variant="contained">
            Create
          </Button>
          </Stack>
        </Box>
      </Modal>
      <Snackbar
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'top'
        }}
        open={snackbar.isVisible}
        onClose={snackbar.updateVisibility}
        message={snackbar.message}
      />
    </>
  );
}

export default CreateEventPage