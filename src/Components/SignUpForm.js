import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  Label,
  Input,
  Button,
  FormGroup,
  Form,
} from "reactstrap";
import WarApi from "../warApi";
import Toast from "./Toast";
import "./Toast.css";
import { authActions } from "../store/auth-slice";

function SignupForm() {
  const dispatch = useDispatch();

  const INITIAL_STATE = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  async function login(data, username) {
    let res = await WarApi.loginUser(data);
    if (res) {
      let user = await WarApi.loggedInUser(username);
      console.log(user);
      setToken(res);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(res));
      dispatch(authActions.login());
      new Toast({
        message: `Welcome ${user.player.firstName}`,
        type: "success",
      });
    }
  }

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      setCurrentUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [token]);

  async function registerNewUser(data) {
    let newUserToken = await WarApi.registerUser(data);
    if (newUserToken) {
      let newUser = {
        username: data.username,
        password: data.password,
      };
      login(newUser, data.username);
    }
  }

  const submit = (e) => {
    e.preventDefault();
    // console.log(formData);
    registerNewUser(formData);
    // setFormData(INITIAL_STATE);
  };
  return (
    <section>
      <h1>Create New Account</h1>
      <Card>
        <CardBody className="text-center">
          <Form onSubmit={submit}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                required="required"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                required="required"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                required="required"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                required="required"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                required="required"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormGroup>

            <Button id="btn-login" className="btn btn-primary btn-lg btn-block">
              Create Account
            </Button>
          </Form>
        </CardBody>
      </Card>
    </section>
  );
}

export default SignupForm;
