import { createSlice } from "@reduxjs/toolkit";

const warSlice = createSlice({
  name: "war",
  initialState: {
    p1Attack: [],
    p2Attack: [],
    p1Battle: [],
    p2Battle: [],
  },
  reducers: {
    addP1Attack: (state, action) => {
      state.p1Attack.push(action.payload);
    },
    addP2Attack: (state, action) => {
      state.p2Attack.push(action.payload);
    },
    addP1Battle: (state, action) => {
      state.p1Battle.push(action.payload);
    },
    addP2Battle: (state, action) => {
      state.p2Battle.push(action.payload);
    },
    removeP1Attack: (state, action) => {
      state.p1Attack.pop();
    },
    removeP2Attack: (state, action) => {
      state.p2Attack.pop();
    },
    removeP1Battle: (state, action) => {
      state.p1Battle.push(action.payload);
    },
    removeP2Battle: (state, action) => {
      state.p2Battle.push(action.payload);
    },
  },
});

export const warActions = warSlice.actions;

export default warSlice;
