import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  isError: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload.message;
      state.isError = action.payload.isError;
    },
    clearNotification: (state) => {
      state.message = null;
      state.isError = false;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const setNotificationMessage = ({ message, timeout, isError = false }) => {
  return dispatch => {
    dispatch(setNotification({ message: message, isError: isError }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeout * 1000);
  };
};

export default notificationSlice.reducer;
