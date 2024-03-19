import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navVal: "warehouse",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setNavVal: (state, action) => {
      state.navVal = action.payload;
    },
  },
});

export const { setNavVal } = adminSlice.actions;
export default adminSlice.reducer;
