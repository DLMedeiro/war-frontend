import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "react-router-dom";
import { loginUser } from "../../store/user-slice";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const LoginForm = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const INITIAL_STATE = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(loginUser(formData));
    setFormData(INITIAL_STATE);
    // console.log(currentUser);
  };

  useEffect(() => {
    if (isLoggedIn) {
      return redirect("/");
    }
  }, [isLoggedIn]);

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
    <div className="container">
      <h1>Login</h1>
      {loading ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#c19595" />
        </View>
      ) : (
        ""
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <button id="btn-login" className="btn btn-lg btn-block" type="submit">
          LogIn
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
