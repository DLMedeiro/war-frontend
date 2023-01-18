import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import SignupForm from "./SignUpForm";

// import "./Home.css";

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showGuest, setShowGuest] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  function showLoginForm() {
    setShowSignUp(false);
    setShowLogin(true);
  }
  function showSignupForm() {
    setShowLogin(false);
    setShowSignUp(true);
  }

  useEffect(() => {
    if (!isLoggedIn) {
      setShowLogin(false);
      setShowSignUp(false);
    }
  }, [isLoggedIn]);

  return (
    <div>
      <h1>This is the Home Page</h1>
      <button>
        <Link to="/">Continue as Guest</Link>
      </button>
      <button onClick={showLoginForm}>Log In</button>
      <button onClick={showSignupForm}>Create an Account</button>
      {showLogin && <LoginForm />}
      {showSignUp && <SignupForm />}
    </div>
  );
}

export default Home;
