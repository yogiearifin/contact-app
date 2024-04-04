import { configureStore } from "@reduxjs/toolkit";
import contactReducer from './slices/contactSlice'
import detailReducer from './slices/detailContactSlice'

export const store = configureStore({
  reducer:{
    contact: contactReducer,
    detail:detailReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch