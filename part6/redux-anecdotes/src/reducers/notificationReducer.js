import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return action.payload;
    },
    clearNotification: (state) => {
      return null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;


export const setNotificationMessage = ({ notification, timeout }) => {
  return dispatch => {
    dispatch(setNotification(notification));
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeout * 1000);
  };
};



export default notificationSlice.reducer;
