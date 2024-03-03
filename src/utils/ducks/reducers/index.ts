import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authSlice from './auth'

export const reducers = combineReducers({
    authSlice
})