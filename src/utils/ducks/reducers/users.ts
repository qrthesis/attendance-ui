import { createSlice, configureStore } from "@reduxjs/toolkit";

interface IAdminUser {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "student";
}

interface IStudentUser {
  _id: string;
  name: string;
  email: string;
  course: string;
  role: "admin" | "student";
}

interface IUsersState {
  admin: Array<IAdminUser>;
  students: Array<IStudentUser>;
}

const initialState: IUsersState = {
  admin: [],
  students: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    saveAdminUser: (state, action) => {
      return {
        ...state,
        admin: action.payload,
      };
    },
    saveStudentUsers: (state, action) => {
      return {
        ...state,
        students: action.payload,
      };
    },
    resetState: (state) => ({
      ...initialState,
    }),
  },
});

export const { saveAdminUser, saveStudentUsers, resetState } =
  usersSlice.actions;

export default usersSlice.reducer;
