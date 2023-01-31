import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SetPlayerForm from "./Game-Components/SetPlayerForm";

function Profile() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div>
      <h1>Welcome {currentUser.username}!</h1>
      <h2>This is your profile</h2>
      <h3>
        Soon you will be able to edit your user information (username,
        firstName, lastName, e-mail)
      </h3>
    </div>
  );
}

export default Profile;
