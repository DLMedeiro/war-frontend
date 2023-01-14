import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { playersActions } from "../../store/player-slice";
import WarApi from "../../warApi";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { fetchCards } from "../../store/cards-slice";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(playersActions.addPlayer(formData));
    dispatch(fetchCards());
    setFormData(INITIAL_STATE);
    // clearCards();
  };
  // async function clearCards() {
  //   await WarApi.removeCards();
  // }
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

      <Link
        type="button"
        id="btn-login"
        className="btn btn-primary btn-lg btn-block"
        onClick={handleSubmit}
        to="/newGame"
      >
        Let's Play!
      </Link>
    </form>
  );
};

export default SetPlayerForm;
