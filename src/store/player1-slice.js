import { createSlice } from "@reduxjs/toolkit";

const player1Slice = createSlice({
  name: "player1",
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
    addToBattle: (state, action) => {
      // Change to unshift to add to beginning to fit in with UI format
      state.battle.unshift(action.payload);
    },
    removeFromBattle: (state, action) => {
      state.battle = [];
    },
    addToCollection: (state, action) => {
      state.collection.push(action.payload);
    },
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

export const player1Actions = player1Slice.actions;

export default player1Slice;
