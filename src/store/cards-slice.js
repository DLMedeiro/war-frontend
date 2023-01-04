import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import WarApi from "../warApi";

export const fetchCards = createAsyncThunk("game/setup", async () => {
  const cards = await WarApi.getCards();
  console.log(cards);
  return cards;
});

const cardSlice = createSlice({
  name: "cardDeck",
  initialState: {
    cardDeck: [],
    loading: false,
    gameReady: false,
  },
  reducers: {
    startGame: (state, action) => {
      state.gameReady = true;
    },
    endGame: (state, action) => {
      state.gameReady = false;
    },
  },
  extraReducers: {
    [fetchCards.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchCards.fulfilled]: (state, action) => {
      state.loading = false;
      state.cardDeck.push(action.payload);
    },
    [fetchCards.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const cardsActions = cardSlice.actions;

export default cardSlice;
