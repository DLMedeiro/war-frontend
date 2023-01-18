import React, { useState, useEffect } from "react";
import { redirect } from "react-router-dom";
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
import { registerUser } from "../store/user-slice";

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
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
    setFormData(INITIAL_STATE);
  };
  useEffect(() => {
    if (isLoggedIn) {
      return redirect("/");
    }
  }, [isLoggedIn]);
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
