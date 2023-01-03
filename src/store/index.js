import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import playersSlice from "./player-slice";
import cardSlice from "./cards-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    players: playersSlice.reducer,
    cardDeck: cardSlice.reducer,
  },
});

export default store;
