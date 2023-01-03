import { createSlice } from "@reduxjs/toolkit";

const player2Slice = createSlice({
  name: "player2Cards",
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
      state.cards.shift();
    },
    shuffleCollection: (state, action) => {},
    moveCollection: (state, action) => {
      state.cards.push(state.collection);
      state.collection = [];
    },
  },
});

export const player2Actions = player2Slice.actions;

export default player2Slice;
