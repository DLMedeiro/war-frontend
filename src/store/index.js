import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import playersSlice from "./player-slice";
import cardSlice from "./cards-slice";
import player1Slice from "./player1-slice";
import player2Slice from "./player2-slice";
import warSlice from "./war-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    players: playersSlice.reducer,
    cardDeck: cardSlice.reducer,
    player1: player1Slice.reducer,
    player2: player2Slice.reducer,
    war: warSlice.reducer,
  },
});

export default store;
