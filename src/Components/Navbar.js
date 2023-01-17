import React, { useState } from "react";
import "./NavBar.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../store/auth-slice";
import { cardsActions, clearCards } from "../store/cards-slice";
import { player1Actions } from "../store/player1-slice";
import { player2Actions } from "../store/player2-slice";
import { playersActions } from "../store/player-slice";
import InstructionModal from "./Game-Components/InstructionModal";

function NavBar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const players = useSelector((state) => state.players.players);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(authActions.logout());
  };
  // State for Instruction Modal
  const [show, setShow] = useState(false);

  const newGame = () => {
    dispatch(player1Actions.endGame());
    dispatch(player2Actions.endGame());
    dispatch(cardsActions.endGame());
    dispatch(playersActions.removeWinner());
    dispatch(playersActions.removePlayers());
    dispatch(clearCards());
  };

  function loggedIn() {
    return (
      <ul className="nav justify-content-center">
        <li className="nav-item nav-link">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item nav-link">
          <Link to="/instructions">How to Play</Link>
        </li>
        <li className="nav-item nav-link">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="nav-item nav-link">
          <Link to="/" onClick={logout}>
            Log Out
          </Link>
        </li>
      </ul>
    );
  }
  function gamePlay() {
    return (
      <ul className="nav justify-content-center">
        <li className="nav-item nav-link">
          <Link to="/" onClick={newGame}>
            Leave Game
          </Link>
        </li>
        <li className="nav-item nav-link">
          <Link onClick={() => setShow(true)}>How to Play</Link>
          <InstructionModal onClose={() => setShow(false)} show={show} />
        </li>
      </ul>
    );
  }

  function loggedOut() {
    return (
      <ul className="nav justify-content-center">
        <li className="nav-item nav-link">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item nav-link">
          <Link to="/instructions">How to Play</Link>
        </li>
        <li className="nav-item nav-link">
          <Link to="/login">Login</Link>
        </li>
        <li className="nav-item nav-link">
          <Link to="/signup">Create Account</Link>
        </li>
      </ul>
    );
  }

  return (
    <div>
      {players.length <= 1 ? (
        <>{isLoggedIn ? loggedIn() : loggedOut()}</>
      ) : (
        <>{gamePlay()}</>
      )}
    </div>
  );
}

// function NavBar({ logout }) {
//   const player = useContext(UserContext);
//   return (
//     <nav>
//       {player.username ? (
//         <ul className="nav justify-content-center">
//           <li className="nav-item">
//             <Link to="/" className="nav-link active" aria-current="page">
//               Home
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/instructions" className="nav-link">
//               How to Play
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/newGame" className="nav-link">
//               New Game
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/profile" className="nav-link">
//               Profile
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/" className="nav-link" onClick={logout}>
//               Log Out {player.username}
//             </Link>
//           </li>
//         </ul>
//       ) : (
//         <ul className="nav justify-content-center">
//           <li className="nav-item">
//             <Link to="/" className="nav-link active" aria-current="page">
//               Home
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/instructions" className="nav-link">
//               How to Play
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/newGame" className="nav-link">
//               New Game
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/login" className="nav-link">
//               Login
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/NewAccount" className="nav-link">
//               New Account
//             </Link>
//           </li>
//         </ul>
//       )}
//     </nav>
//   );
// }

export default NavBar;
