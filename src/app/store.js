import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/todoSlice";

export const store = configureStore({
  reducer: {
    task: taskReducer,
  },
});
