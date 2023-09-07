import { createSlice } from "@reduxjs/toolkit";

const initialState = "Notification: Anecdote app ready to be used";

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;