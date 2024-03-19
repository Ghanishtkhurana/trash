import adminSlice from "@/slice/adminSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    adminSlice: adminSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});
