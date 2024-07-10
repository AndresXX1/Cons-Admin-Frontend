import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";

const reducer = combineReducers({
  auth: authSlice,
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
