import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SetPlayerForm from "./Game-Components/SetPlayerForm";

function Profile() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div>
      <h1>Welcome User!</h1>
      <h2>This is your profile</h2>
      <h3>You can't do anything with it yet</h3>
    </div>
  );
}

export default Profile;
