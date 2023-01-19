import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SetPlayerForm from "./Game-Components/SetPlayerForm";

function Profile() {
  const currentUser = useSelector((state) => state.user.currentUser.player);
  // console.log(currentUser);
  return (
    <div>
      <h1>Welcome {currentUser.username}!</h1>
      <h2>This is your profile</h2>
      <h3>You can't do anything with it yet</h3>
    </div>
  );
}

export default Profile;
