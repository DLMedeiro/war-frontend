import { createSlice } from "@reduxjs/toolkit";

const player2Slice = createSlice({
  name: "player2",
  initialState: {
    cards: [],
    war: [],
    battle: [],
    collection: [],
    score: 26,
  },
  reducers: {
    addCard: (state, action) => {
      state.cards.push(action.payload);
    },
    removeCard: (state, action) => {
      state.cards.shift();
    },
    addToWar: (state, action) => {
      state.war.push(action.payload);
    },
    removeFromWar: (state, action) => {
      state.war = [];
    },
    addToBattle: (state, action) => {
      state.battle.push(action.payload);
    },
    removeFromBattle: (state, action) => {
      state.battle = [];
    },
    addToCollection: (state, action) => {
      state.collection.push(action.payload);
    },
    shuffleCollection: (state, action) => {},
    moveCollection: (state, action) => {
      state.cards.push(state.collection);
      state.collection = [];
    },
    updateScore: (state, action) => {
      state.score = action.payload;
    },
  },
});

export const player2Actions = player2Slice.actions;

export default player2Slice;
