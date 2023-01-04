import React from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch the actions
    dispatch(authActions.login());
  };
  return (
    <div className="container">
      <h1>Login</h1>{" "}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">Id</label>
          <input className="form-control" type="text" name="id" id="id" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <button className="btn btn-primary btn-lg btn-block" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

// import React, { useState, useContext } from "react";
// import { Link } from "react-router-dom";
// import { Redirect } from "react-router-dom";
// import UserContext from "./UserContext";
// import Home from "./Home";

// import {
//   Card,
//   CardBody,
//   Label,
//   Input,
//   Button,
//   FormGroup,
//   Form,
// } from "reactstrap";

// function LoginForm({ login }) {
//   const player = useContext(UserContext);
//   const INITIAL_STATE = {
//     username: "",
//     password: "",
//   };
//   const [playerLogin, setPlayerLogin] = useState(INITIAL_STATE);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPlayerLogin((playerLogin) => ({
//       ...playerLogin,
//       [name]: value,
//     }));
//   };

//   const submit = (e) => {
//     e.preventDefault();
//     login(playerLogin, playerLogin.username);
//     setPlayerLogin(INITIAL_STATE);
//   };

//   return (
//     <>
//       {player.username ? (
//         <>
//           <Home />
//         </>
//       ) : (
//         <>
//           <section>
//             <Card>
//               <CardBody className="text-center">
//                 <Form onSubmit={submit}>
//                   <FormGroup>
//                     <Label htmlFor="username">UserName</Label>
//                     <Input
//                       id="username"
//                       required="required"
//                       type="text"
//                       name="username"
//                       value={playerLogin.username}
//                       onChange={handleChange}
//                     />
//                   </FormGroup>
//                   <FormGroup>
//                     <Label htmlFor="password">Password</Label>
//                     <Input
//                       id="password"
//                       required="required"
//                       type="password"
//                       name="password"
//                       value={playerLogin.password}
//                       onChange={handleChange}
//                     />
//                   </FormGroup>
//                   <Button>Log In</Button>
//                 </Form>
//               </CardBody>
//             </Card>
//             <Link to="/newAccount">Create a new Account</Link>
//           </section>
//         </>
//       )}
//     </>
//   );
// }

// export default LoginForm;
