import { createSlice } from "@reduxjs/toolkit";

const player1Slice = createSlice({
  name: "player1Cards",
  initialState: {
    cards: [],
    collection: [],
    score: 26,
  },
  reducers: {
    addCards: (state, action) => {
      state.cards.push(action.payload);
    },
    updateScore: (state, action) => {
      state.score = action.payload;
    },
    removeFromCards: (state, action) => {
      state.cards.pop();
    },
    shuffleCollection: (state, action) => {},
    moveCollection: (state, action) => {
      state.cards.push(state.collection);
      state.collection = [];
    },
  },
});

export const player1Actions = player1Slice.actions;

export default player1Slice;
