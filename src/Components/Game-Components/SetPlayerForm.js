import { Modal } from "bootstrap";
import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playersActions } from "../../store/player-slice";
import { fetchCards } from "../../store/cards-slice";
import WarApi from "../../warApi";
import "bootstrap/dist/css/bootstrap.min.css";

const SetPlayerForm = () => {
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
    setFormData(INITIAL_STATE);
    clearCards();
  };
  async function clearCards() {
    await WarApi.removeCards();
  }
  return (
    <form>
      <div className="form-group">
        <label htmlFor="player1">Player 1</label>
        <input
          className="form-control"
          onChange={handleChange}
          name="player1"
        />
      </div>
      <div className="form-group">
        <label htmlFor="player2">Player 2</label>
        <input
          className="form-control"
          onChange={handleChange}
          name="player2"
        />
      </div>
      <button
        type="button"
        className="btn btn-primary btn-lg btn-block"
        onClick={handleSubmit}
      >
        Let's Play!
      </button>
    </form>
  );
};

export default SetPlayerForm;
