import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user-slice";
import playersSlice from "./player-slice";
import cardSlice from "./cards-slice";
import player1Slice from "./player1-slice";
import player2Slice from "./player2-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    players: playersSlice.reducer,
    cardDeck: cardSlice.reducer,
    player1: player1Slice.reducer,
    player2: player2Slice.reducer,
  },
});

export default store;
