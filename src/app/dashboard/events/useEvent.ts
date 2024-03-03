import { createEvent } from '@/utils/queries/events'
import dayjs from 'dayjs'
import { useState } from 'react'
const useEvent = () => {

    const [isCreateEventModalVisible, setIsCreateModalVisible] = useState<boolean>(false)
    const [isSnackbarVisible, setIsSnackbarVisible] = useState<boolean>(false)
    const [snackbarMessage, setSnackbarMessage] = useState<string>('')
    const [createEventFields, setcreateEventFields] = useState({
        name: "",
        description: "",
        date: ""
    })
    
    const handleCreateEventFieldChange = (key: string, value: any) => {
        setcreateEventFields(prevState => ({
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

        if (result.status === 200) {
            setIsCreateModalVisible(prevState => !prevState)
            setIsSnackbarVisible(prevState => !prevState)
            setSnackbarMessage(result.message)
        } else {
            setIsCreateModalVisible(prevState => !prevState)
            setIsSnackbarVisible(prevState => !prevState)
            setSnackbarMessage(result.message)
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
            isVisible: isSnackbarVisible,
            message: snackbarMessage,
            updateVisibility: () => setIsSnackbarVisible(prevState => !prevState)    
        },
        handleCreateEvent
    }
}

export default useEvent