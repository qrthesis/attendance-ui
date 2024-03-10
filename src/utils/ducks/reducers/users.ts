import { createSlice, configureStore } from "@reduxjs/toolkit";

interface IAdminUser {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "student";
}

interface IUsersState {
  admin: Array<IAdminUser>;
}

const initialState: IUsersState = {
  admin: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    saveAdminUSer: (state, action) => {
      return {
        ...state,
        admin: action.payload,
      };
    },
    resetState: (state) => ({
      ...initialState,
    }),
  },
});

export const { saveAdminUSer, resetState } = usersSlice.actions;

export default usersSlice.reducer;
