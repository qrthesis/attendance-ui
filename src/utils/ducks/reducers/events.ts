import { createSlice, configureStore } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { stat } from "fs";

interface IEventsState {
  events: {
    completed: Array<any>;
    upcoming: Array<any>;
    inProgress: Array<any>;
  };
  attendance: Array<any>;
  isFetching: {
    events: boolean;
    attendance: boolean;
  };
}

const initialState: IEventsState = {
  events: {
    completed: [],
    upcoming: [],
    inProgress: [],
  },
  attendance: [],
  isFetching: {
    events: false,
    attendance: false,
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

        const eventDate = dayjs.unix(event.timeIn).format("MM/DD/YYYY");

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
    saveAttendance: (state, action) => {
      return {
        ...state,
        attendance: action.payload,
      };
    },
    updateFetchingState: (state, action) => {
      const { key, value } = action.payload;
      return {
        ...state,
        isFetching: {
          ...state.isFetching,
          [key]: value,
        },
      };
    },
    resetState: (state) => ({
      ...initialState,
    }),
  },
});

export const { saveEvents, resetState, saveAttendance, updateFetchingState } =
  eventsSlice.actions;

export default eventsSlice.reducer;
