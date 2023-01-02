import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import playersSlice from "./player-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    players: playersSlice.reducer,
  },
});

export default store;
