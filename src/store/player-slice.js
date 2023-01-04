import { createSlice } from "@reduxjs/toolkit";

const playersSlice = createSlice({
  name: "players",
  initialState: { players: [], winner: [] },
  reducers: {
    addPlayer: (state, action) => {
      state.players.push(action.payload);
    },
    removePlayers: (state, action) => {
      state.players.pop();
    },
    addWinner: (state, action) => {
      state.winner.push(action.payload);
    },
    removeWinner: (state, action) => {
      state.winner.pop();
    },
  },
});

export const playersActions = playersSlice.actions;

export default playersSlice;
