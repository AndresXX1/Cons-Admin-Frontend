import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "../types/auth";
import {
  getUserAsync,
  logInAsync,
  signUpAsync,
  verifySessionAsync,
  uploadAvatarAsync,
  logInWithGoogleAsync,
  logOutAsync,
  setRedirect,
  resetRedirect,
  verifyCode,
  myEventsAsync,
} from "@store/actions/auth";

const initialState: IAuthState = {
  authenticated: false,
  loading: true,
  user: null,
  isAdmin: false,
  shouldRedirect: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(verifySessionAsync.fulfilled, state => {
        state.authenticated = true;
        state.loading = false;
      })
      .addCase(verifySessionAsync.rejected, state => {
        state.authenticated = false;
        state.loading = false;
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.user = action.payload.user;
        if (action.payload.user.role === ROLE.ADMIN) state.isAdmin = true;
      })
      .addCase(getUserAsync.rejected, state => {
        state.user = null;
        state.authenticated = false;
      })
      .addCase(logInAsync.fulfilled, state => {
        state.authenticated = true;
      })
      .addCase(logInAsync.rejected, state => {
        state.authenticated = false;
      })
      .addCase(uploadAvatarAsync.fulfilled, (state, action) => {
        if (state.user) {
          state.user.avatar = action.payload;
        }
      })
      .addCase(logInWithGoogleAsync.fulfilled, state => {
        state.authenticated = true;
      })
      .addCase(logInWithGoogleAsync.rejected, state => {
        state.authenticated = false;
      })
      .addCase(logOutAsync.fulfilled, state => {
        state.authenticated = false;
        state.user = null;
      })
      .addCase(logOutAsync.rejected, state => {
        state.authenticated = false;
        state.user = null;
      })
      .addCase(setRedirect.fulfilled, (state, action) => {
        state.shouldRedirect = action.payload.redirect;
      })
      .addCase(resetRedirect.rejected, state => {
        state.shouldRedirect = null;
      })
      .addCase(signUpAsync.fulfilled, state => {
        state.authenticated = true;
      })
      .addCase(signUpAsync.rejected, state => {
        state.authenticated = false;
      })
      .addCase(verifyCode.fulfilled, state => {
        if (state.user) {
          state.user.email_verified = true;
        }
      })
      .addCase(myEventsAsync.fulfilled, (state, action) => {
        if (state.user) {
          state.user.events = action.payload;
        }
      })
      .addCase(myEventsAsync.rejected, state => {
        if (state.user) {
          state.user.events = [];
        }
      });
  },
});

export default authSlice.reducer;
