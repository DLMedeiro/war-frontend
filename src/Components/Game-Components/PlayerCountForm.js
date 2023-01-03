import { Modal } from "bootstrap";
import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playersActions } from "../../store/player-slice";
import { fetchCards } from "../../store/cards-slice";
import WarApi from "../../warApi";

const PlayerCountForm = () => {
  const players = useSelector((state) => state.players.players);
  const dispatch = useDispatch();

  const INITIAL_STATE = {};
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };
  //   console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(playersActions.addPlayer(formData));
    dispatch(fetchCards());
    setFormData(INITIAL_STATE);
  };
  async function clearCards() {
    await WarApi.removeCards();
  }
  return (
    <form>
      <label htmlFor="player1">Player 1</label>
      <input onChange={handleChange} name="player1" />
      <label htmlFor="player2">Player 2</label>
      <input onChange={handleChange} name="player2" />
      <button onClick={handleSubmit}>Let's Play!</button>
      <button onClick={clearCards}>Clear Cards</button>
    </form>
  );
};

export default PlayerCountForm;
