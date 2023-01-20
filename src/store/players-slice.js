import { createSlice } from "@reduxjs/toolkit";

const playersSlice = createSlice({
  name: "players",
  initialState: { players: [], currentPlayer: [], winner: [] },
  reducers: {
    addPlayer: (state, action) => {
      // console.log(action.payload);
      state.players.push(action.payload);
    },
    removePlayers: (state, action) => {
      state.players = [];
    },
    setCurrentPlayer: (state, action) => {
      state.currentPlayer = action.payload;
    },
    removeCurrentPlayer: (state, action) => {
      state.currentPlayer = [];
    },
    addWinner: (state, action) => {
      state.winner.push(action.payload);
    },
    removeWinner: (state, action) => {
      state.winner = [];
    },
  },
});

export const playersActions = playersSlice.actions;

export default playersSlice;
