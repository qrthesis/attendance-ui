import { createSlice, configureStore } from '@reduxjs/toolkit'

interface IUser {
  _id: string,
  name: string,
  email: string,
  role: 'admin' | 'student'
  _createdAt: any
  _updatedAt: any
}

interface IAuthState {
  isLoggedIn: boolean
  user: IUser | null | undefined
}

const initialState: IAuthState = {
    isLoggedIn: false,
    user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUser: (state, {payload}) => ({
        ...state,
        user: payload
    }),
    resetState: (state) => ({
        ...initialState
    })
  }
})

export const {
    resetState, 
    saveUser
} = authSlice.actions

export default authSlice.reducer