import React from "react";

// import "./Instructions.css";

function Instructions() {
  return (
    <div>
      <h1>This is how you play Skyjo!</h1>
      <h2> Game Idea and Game Target </h2>
      <p>
        This version of the game Skyjo ends when a player has all their cards
        displayed face up on their board. The goal of the game is to have the
        least amount of points showing on your board.
      </p>
      <h2>How the game is prepared</h2>
      <p>
        The game deck consists of 3 standard card decks (156 cards, 12 of each
        card type)
      </p>
      <p>
        Each card is assigned a point value used for scoring. Aces = -2, Kings =
        -1, Queens and Jacks = 0, and all remaining cards will keep their face
        value (2 = 2, 3 = 3, 4 = 4, etc...)
      </p>
      <p>
        To start each player is assigned a board which consists of 12 cards face
        down, placed in four vertical rows with three cards per row.
      </p>
      <p>
        Each game has a center board consisting of two stacks where cards will
        be exchanged throughout the game. The first stack is the discard pile,
        which starts with a single card face up. The second stack is the draw
        pile, which holds the rest of the cards placed face down.
      </p>
      <h2>The start of a game round</h2>
      <p>
        To start each player reveals two cards from their board by flipping them
        face up.
      </p>
      <p>
        The player with the highest sum of points between the two face up cards
        gets to start the game. If the sum of cards between players is equal,
        each player flips an additional card, until one player has a higher
        total.
      </p>
      <p>
        Example: The cards of Player A show a 10 and an Ace, which results in a
        total of 8. The cards of Player B show a 4 and a Queen, which results in
        a total of 4. Player A gets to start first because their cards totaled
        in a bugger sum.
      </p>
      <h2>Course of the game</h2>
      <p>Play starts with the drawing of a card.</p>
      <p>
        The player may choose whether they want to draw the first face up card
        on the discard pile, or the first face down card on the draw pile.
      </p>
      <p>
        If the player chooses the face up card form the discard pile, they have
        to exchange it for one of the playing cards on their board. The player
        can make the exchange with any of the face up and face down cards on
        their board.
      </p>
      <p>
        If the player chooses to exchange the new card with a face down card on
        their board they may not look at the face down card prior to making
        their selection. Once the exchanged card is decided, the card originally
        pulled from the discard pile is placed face up on their board, and the
        exchanged card is placed face up on the discard pile.
      </p>

      <p>
        If the player chooses a face down card from the draw pile, they may look
        at the card and choose whether they want to exchange it for one of the
        face down or face up cards on their board.
      </p>

      <p>If they keep the card, it runs as described above.</p>

      <p>
        If they do not want to keep the drawn card, the card is placed face up
        on the discard pile and the player must flip over a face down card of
        their choosing from their board.
      </p>

      <p>The player’s turn then ends and it is the next player’s turn.</p>

      <p>
        The game round ends as soon as a player has revealed all their cards.
        Then the remaining players will have one more move.
      </p>

      <p>
        Afterwards, the points of each player’s cards are added up to create
        their final score. The player who finishes the game must have the
        smallest number of points at the completion of the game. If they do not
        have the lowest points because another player has reached fewer or the
        same amount, it leads to a doubling of points collected to the player’s
        score.
      </p>

      <p>
        Example: Player A shows all their cards and finishes the game round.
        Player A has 10 points at the end of the game, Player B has 24 points,
        and Player C has 10 points. Player A does not have the lowest score and
        since they ended the game their score is doubled to 10.
      </p>

      <h2>Special Rule</h2>
      <p>
        If at any time a player has three matching cards in a vertical row, the
        player places the entire row of cards on the discard pile. This rule
        also applies in the last turn of the game when the remaining cards are
        turned over and added up for the final score. If the row of cards is
        achieved due to an exchange with the draw pile or discard pile, the
        three matching cards are placed on the discard pile face up after the
        exchanged card. End of game At the end of a game points of every player
        are added to their current score. The player with the lowest score wins
        the game.
      </p>
    </div>
  );
}

export default Instructions;
