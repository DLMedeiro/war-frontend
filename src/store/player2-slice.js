import { createSlice } from "@reduxjs/toolkit";

const player2Slice = createSlice({
  name: "player2",
  initialState: {
    player: [],
    cards: [],
    war: [],
    battle: [],
    collection: [],
    playerTurn: false,
  },
  reducers: {
    addPlayer: (state, action) => {
      state.player = action.payload;
    },
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
    // Change to unshift to add to beginning to fit in with UI format
    addToBattle: (state, action) => {
      state.battle.unshift(action.payload);
    },
    removeFromBattle: (state, action) => {
      state.battle = [];
    },
    addToCollection: (state, action) => {
      state.collection.push(action.payload);
    },
    shuffleCollection: (state, action) => {},
    removeFromCollection: (state, action) => {
      state.collection = [];
    },
    endGame: (state, action) => {
      state.cards = [];
      state.war = [];
      state.battle = [];
      state.collection = [];
    },
    changeTurn: (state, action) => {
      if (state.playerTurn) {
        state.playerTurn = false;
      } else {
        state.playerTurn = true;
      }
    },
  },
});

export const player2Actions = player2Slice.actions;

export default player2Slice;
