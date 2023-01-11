import React from "react";
import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "./../store/auth-slice";

function NavBar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(authActions.logout());
  };
  return (
    <nav>
      {isLoggedIn ? (
        <ul className="nav justify-content-center">
          <li className="nav-item nav-link">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item nav-link">
            <Link to="/instructions">How to Play</Link>
          </li>
          <li className="nav-item nav-link">
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      ) : (
        <ul className="nav justify-content-center">
          <li className="nav-item nav-link">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item nav-link">
            <Link to="/instructions">How to Play</Link>
          </li>
        </ul>
      )}
    </nav>
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
