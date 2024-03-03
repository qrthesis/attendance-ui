import { createSlice, configureStore } from '@reduxjs/toolkit'


interface IEventsState {
    savedEvents: Array<any>
}

const initialState: IEventsState = {
    savedEvents: []
}

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    resetState: (state) => ({
        ...initialState
    })
  }
})

export const {
    resetState, 
} = eventsSlice.actions

export default eventsSlice.reducer