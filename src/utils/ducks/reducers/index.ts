import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth";
import eventsSlice from "./events";

export const reducers = combineReducers({
  authSlice,
  eventsSlice,
});
