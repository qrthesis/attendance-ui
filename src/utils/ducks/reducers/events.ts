import { createSlice, configureStore } from "@reduxjs/toolkit";

interface IEventsState {
  events: {
    completed: Array<any>;
    upcoming: Array<any>;
    inProgress: Array<any>;
  };
}

const initialState: IEventsState = {
  events: {
    completed: [],
    upcoming: [],
    inProgress: [],
  },
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    saveEvents: (state, action) => {
      const fetchedEvents = action.payload;

      let upcomingEvents = [],
        inProgressEvents = [],
        completedEvents = [];

      fetchedEvents.forEach((event: any) => {
        const eventDate = new Date(event.date);
        if (eventDate > new Date()) {
          upcomingEvents.push(event);
        } else if (eventDate < new Date()) {
          completedEvents.push(event);
        } else {
          inProgressEvents.push(event);
        }
      });

      return {
        ...state,
        events: {
          completed: completedEvents,
          upcoming: upcomingEvents,
          inProgress: inProgressEvents,
        },
      };
    },
    resetState: (state) => ({
      ...initialState,
    }),
  },
});

export const { saveEvents, resetState } = eventsSlice.actions;

export default eventsSlice.reducer;
