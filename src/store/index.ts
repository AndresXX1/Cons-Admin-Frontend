import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import productSlice from "./reducers/products"
import addressSlice from './reducers/user';


const reducer = combineReducers({
  auth: authSlice,
  Product: productSlice,
  address: addressSlice,
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
