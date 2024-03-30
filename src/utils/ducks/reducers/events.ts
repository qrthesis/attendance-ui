import { createSlice, configureStore } from "@reduxjs/toolkit";
import dayjs from "dayjs";

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

      let upcomingEvents: any = [],
        inProgressEvents: any = [],
        completedEvents: any = [];

      fetchedEvents.forEach((event: any) => {
        // = new Date(event.date);

        const eventDate = dayjs.unix(event.date).format("MM/DD/YYYY");

        if (dayjs().isBefore(eventDate, "date")) {
          upcomingEvents.push(event);
        } else if (dayjs().isAfter(eventDate, "date")) {
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
