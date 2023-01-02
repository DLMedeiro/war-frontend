import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class SkyjoApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${SkyjoApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // log in a user
  static async loginPlayer(loginData) {
    let res = await this.request(`auth/token`, loginData, "post");
    // console.log(`res=${res}`);

    SkyjoApi.token = res.token;
    localStorage.setItem("headToken", JSON.stringify(SkyjoApi.token));

    return SkyjoApi.token;
  }

  // Pull user information after login
  static async loggedInPlayer(username) {
    let res = await this.request(`players/${username}`);
    console.log(`res=${res}`);
    return res.player;
  }

  // Create a new user
  static async registerPlayer(newPlayerData) {
    let res = await this.request(`auth/register`, newPlayerData, "post");
    return res.token;
  }

  // *** GAME FUNCTIONS ***

  static async startGame(player1_id, player2_id) {
    //  Output: game_id
    let res = await this.request(`start`, player1_id, player2_id, "post");
    return res;
  }

  static async deal(cardLocationInfo) {
    //  Output: game_id
    // console.log("test");
    // console.log(cardLocationInfo);
    let res = await this.request(`start/deal`);
    // console.log(res);
    return res;
  }

  static async flipBoardCard(board_id, card_id) {
    // console.log(board_id, card_id);
    // Flip Card on board
    let res = await this.request(
      `play/flip/${board_id}/${card_id}`,
      {},
      "patch"
    );
    return res.playerCards;
  }
  static async updateScore(board_id, score) {
    // Flip Card on board
    let res = await this.request(
      `play/update_score/${board_id}`,
      { score },
      "patch"
    );
    // console.log(res);
    return res;
  }

  static async drawCard(card_id, location = "") {
    // Input: card_code
    // Output: move_id
    let res = await this.request(`/play/draw`, card_id, location, "patch");
    return res.DrawPileCards;
  }

  static async discardCard(card_id, location = "discard") {
    // game/play/${game_id}/${player_id}/${move_id}/discard, PATCH
    // Input: move_id, location=discard
    let res = await this.request(`/play/discard`, card_id, location, "patch");
    return res.discardPileCards;
  }

  static async replaceCard(card_id, board_id, location) {
    // Replace card on board
    // game/play/${game_id}/${player_id}/remove, PATCH
    //  - location = discard
    //  - board_id = null (remove record)
    // game/play/${game_id}/${player_id}/${move_id}/add, PATCH
    // Input: board_id, location
    let res = await this.request(
      `/play/replace`,
      card_id,
      board_id,
      location,
      "patch"
    );
    return res.playerCards;
  }

  static async reset() {
    await this.request("play/endGame", {}, "delete");
  }
}

// assign_winner
//  game/play/${game_id}/winner, PATCH request
// input: player_id
// update game table

// *** Needed?
// update score (get current score)
// game/play/${game_id}/score, GET request
// returns board_ids and scores

export default SkyjoApi;
