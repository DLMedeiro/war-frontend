import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class CardsApi {
  // Review how static works
  static cardDeckId;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    // Need to add to catch promise from initial function
    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    // const headers = { Authorization: `Bearer ${SkyjoApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getDeckId() {
    let res = await this.request(`cards/deckId`);
    // console.log(res);

    CardsApi.cardDeckId = res;
    localStorage.setItem("DeckId", JSON.stringify(CardsApi.cardDeckId));

    return CardsApi.cardDeckId;

    // return res;
    // return CardsApi.cardDeckId;
  }

  static async getPlayerCards(deckId) {
    let res = await this.request(`cards/playerCards`, deckId, "get");
    return res;
  }
}

export default CardsApi;
