import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth";
import eventsSlice from "./events";
import usersSlice from "./users";

export const reducers = combineReducers({
  authSlice,
  eventsSlice,
  usersSlice,
});
