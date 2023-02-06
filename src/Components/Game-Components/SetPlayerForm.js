import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "react-router-dom";
import { fetchCards } from "../../store/cards-slice";
import Toast from "../../Components/Toast";
import "../../Components/Toast.css";
import { playersActions } from "../../store/players-slice";
import { player1Actions } from "../../store/player1-slice";
import { player2Actions } from "../../store/player2-slice";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import "./GameSetup.css";

const SetPlayerForm = () => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players.players);
  const player1 = useSelector((state) => state.player1.player);
  const [player1Placeholder, setPlayer1Placeholder] = useState({});
  const [player2Placeholder, setPlayer2Placeholder] = useState({});

  const INITIAL_STATE = {};
  const [formData, setFormData] = useState(INITIAL_STATE);

  const [loading, setLoading] = useState(false);

  // Computer is added into players when computer choice is chosen.  This checks if players has anything in it, and assigns player 1 to that player("Computer")
  useEffect(() => {
    if (players.length > 0) {
      if (players[0].player1) {
        dispatch(player1Actions.addPlayer({ name: players[0].player1 }));
        setPlayer1Placeholder({ name: "Computer" });
      }
    }
  }, [players]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "player1" && player1.name !== "Computer") {
      if (value === "Computer" || value === "computer") {
        new Toast({
          message:
            '"Computer" is not a valid player name. To play against the computer, please select the play against computer option on the home screen',
          type: "danger",
        });
        setPlayer1Placeholder({});
      } else {
        setPlayer1Placeholder({ name: value });
      }
    }
    if (name === "player2") {
      if (value === "Computer" || value === "computer") {
        new Toast({
          message:
            '"Computer" is not a valid player name. To play against the computer, please select the play against computer option on the home screen',
          type: "danger",
        });
        setPlayer2Placeholder({});
      } else {
        setPlayer2Placeholder({ name: value });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!player1Placeholder.name && !player2Placeholder.name) {
      new Toast({
        message: `Please enter a name for Player 1 and Player 2.  Note: "Computer" is not a valid name, unless the play against computer option has been chosen.`,
        type: "danger",
      });
    }
    if (!player1Placeholder.name) {
      new Toast({
        message: `Please enter a name for Player 1.  Note: "Computer" is not a valid name, unless the play against computer option has been chosen.`,
        type: "danger",
      });
    }
    if (!player2Placeholder.name) {
      new Toast({
        message: `Please enter a name for Player 2.  Note: "Computer" is not a valid name.`,
        type: "danger",
      });
    }
    if (player1Placeholder.name === "Computer" && player1.name !== "Computer") {
      new Toast({
        message: `"Computer" is not a valid name for Player 1, unless the play against computer option has been chosen.`,
        type: "danger",
      });
    }
    if (player1Placeholder.name === "Computer" && player2Placeholder.name) {
      setLoading(true);
      dispatch(player2Actions.addPlayer(player2Placeholder));
      dispatch(playersActions.addPlayer({ player2: player2Placeholder.name }));
      // set current player to player 2
      dispatch(
        playersActions.setCurrentPlayer({ player2: player2Placeholder.name })
      );
      dispatch(fetchCards());
      setFormData(INITIAL_STATE);
      setPlayer1Placeholder({});
      setPlayer2Placeholder({});
      return redirect("/newGame");
    } else if (
      player1Placeholder.name !== "Computer" &&
      player1Placeholder.name &&
      player2Placeholder.name
    ) {
      setLoading(true);
      dispatch(player1Actions.addPlayer(player1Placeholder));
      dispatch(playersActions.addPlayer({ player1: player1Placeholder.name }));
      dispatch(player2Actions.addPlayer(player2Placeholder));
      dispatch(playersActions.addPlayer({ player2: player2Placeholder.name }));
      // Set current player to player 1
      dispatch(
        playersActions.setCurrentPlayer({ player1: player1Placeholder.name })
      );
      dispatch(fetchCards());
      setFormData(INITIAL_STATE);
      setPlayer1Placeholder({});
      setPlayer2Placeholder({});
      return redirect("/newGame");
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10,
    },
  });

  useEffect(() => {
    if (loading) {
      document.getElementById("btn-login").disabled = true;
      // } else if (!loading) {
      //   document.getElementById("btn-login").disabled = false;
    }
  }, [loading]);
  return (
    <>
      {loading ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#c19595" />
        </View>
      ) : (
        ""
      )}
      <form onSubmit={handleSubmit} className="form-input">
        {player1.name === "Computer" ? (
          <div className="form-group">
            <label htmlFor="player1">Player 1</label>
            <input
              className="form-control"
              onChange={handleChange}
              name="player1"
              value={player1.name}
              disabled
            />
          </div>
        ) : (
          <div className="form-group">
            <label htmlFor="player1">Player 1</label>
            <input
              className="form-control"
              onChange={handleChange}
              name="player1"
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="player2">Player 2</label>
          <input
            className="form-control"
            onChange={handleChange}
            name="player2"
          />
        </div>
        <button
          type="submit"
          id="btn-login"
          className="btn btn-primary btn-lg btn-block"
        >
          Let's Play!
        </button>
      </form>
    </>
  );
};

export default SetPlayerForm;
