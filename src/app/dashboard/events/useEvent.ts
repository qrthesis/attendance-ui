import { createEvent } from '@/utils/queries/events'
import dayjs from 'dayjs'


import React, { useState } from 'react'

import Fade from '@mui/material/Fade';
import { TransitionProps } from '@mui/material/transitions';

const useEvent = () => {

    const [isCreateEventModalVisible, setIsCreateModalVisible] = useState<boolean>(false)
    const [createEventFields, setCreateEventFields] = useState({
        name: "",
        description: "",
        date: ""
    })
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
        message: ''
      });

    const handleOpenSnackbar = (message: string) => {
        return setSnackbarState((prevState) => ({
            ...prevState, 
            open: true,
            message
        }));
    }

    const handleCloseSnackbar = () => {
        return setSnackbarState({
            open: false,
            Transition: Fade,
            message: ''
        })
    }

      
    const handleCreateEventFieldChange = (key: string, value: any) => {
        setCreateEventFields(prevState => ({
            ...prevState,
            [key]: value
        }))
    }

    const handleCreateEvent = async() => {
        const result = await createEvent(
            createEventFields.name,
            createEventFields.description,
            dayjs(createEventFields.date).unix()
        )

        if (result?.status === 200) {
            setCreateEventFields({
                name: "",
                description: "",
                date: ""
            })
            setIsCreateModalVisible(prevState => !prevState)
            handleOpenSnackbar(result?.message)
        } else {
            handleOpenSnackbar("Event creation failed!!")
        }
    }

    return {
        modal: {
            isVisible: isCreateEventModalVisible,
            updateVisibility: () => setIsCreateModalVisible(prevState => !prevState)    
        },
        fields: {
            value: createEventFields,
            handler: handleCreateEventFieldChange
        },
        snackbar: {
            isVisible: snackbarState.open,
            message: snackbarState.message,
            onClose: handleCloseSnackbar,
            transition: snackbarState.Transition
        },
        handleCreateEvent
    }
}

export default useEvent