import { createSlice } from "@reduxjs/toolkit";

const playersSlice = createSlice({
  name: "players",
  initialState: { players: [] },
  reducers: {
    addPlayer: (state, action) => {
      state.players.push(action.payload);
    },
    removePlayers: (state, action) => {
      state.players.pop();
    },
  },
});

export const playersActions = playersSlice.actions;

export default playersSlice;
