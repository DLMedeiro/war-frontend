import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import WarApi from "../warApi";
import Toast from "../Components/Toast";
import "../Components/Toast.css";

export const loginUser = createAsyncThunk(`auth/token`, async (data) => {
  const response = await WarApi.loginUser(data);
  if (response) {
    let user = await WarApi.loggedInUser(data.username);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(response));
    new Toast({
      message: `Welcome ${user.player.firstName}`,
      type: "success",
    });
    return user;
  }
});

export const registerUser = createAsyncThunk(`auth/register`, async (data) => {
  const newUserToken = await WarApi.registerUser(data);
  if (newUserToken) {
    let newUser = {
      username: data.username,
      password: data.password,
    };
    const response = await WarApi.loginUser(newUser);
    if (response) {
      let user = await WarApi.loggedInUser(newUser.username);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(response));
      new Toast({
        message: `Welcome ${user.player.firstName}`,
        type: "success",
      });
      return user;
    }
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: { isLoggedIn: false },
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.clear();
    },
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
    },
    [registerUser.pending]: (state, action) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
    },
    [registerUser.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;