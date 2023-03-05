import { createSlice } from "@reduxjs/toolkit";

const defaultCurrentTab = { value: "", label: ""};
const selectedTabSlice = createSlice({
  name: "currentTab",
  initialState: defaultCurrentTab,
  reducers: {
    updateCurrentTab(state, action) {
      state.value = action.payload.value;
      state.label = action.payload.label;
    },
  },
});

export const currentTabAction = selectedTabSlice.actions

export const currentTabReducer = selectedTabSlice.reducer
