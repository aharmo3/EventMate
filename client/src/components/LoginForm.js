import React, { useState } from "react";
import FormInput from "./FormInput";
import Form from "./Form";
import Button from "@mui/material/Button";
import ClientAPI from "../helpers/ClientAPI";
import Local from "../helpers/Local";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

// TODO - Navigate to dashboard
export default function LoginForm({ doRegister }) {
  let [registrationErrorMessage, setRegistrationErrorMessage] = useState("");
  let [loginErrorMessage, setLoginErrorMessage] = useState("");

  const navigate = useNavigate();

  //so the error on line 26 is executed when the response from the backend is not ok in the network tab
  //the error will be visible under the input field in line 57 and 64
  async function handleSubmit(form) {
    const response = await ClientAPI.loginUser(form.username, form.password);

    if (response.ok) {
      Local.saveUserInfo(response.data.token, response.data.user);
      navigate("/dashboard");
    } else {
      setLoginErrorMessage("Login Failed");
    }
  }

  // TODO - Navigate to secondary registration
  async function handleRegistration(form) {
    const response = await ClientAPI.registerUser(
      form.username,
      form.pasword,
      form.username
    );
    if (response.ok) {
      Local.saveUserInfo(response.data.token, response.data.user); // we save the info in local storage only if we want to the person to become logged in the second he registers... if you dont want the person to be logged in the minute they register then just take off this line of code
      navigate("/register-two");
    } else {
      setRegistrationErrorMessage("username already exists");
    }
  }

  return (
    <div className="LoginForm">
      <div className="login-form">
        <h2>Login</h2>
        <Form
          formInitialValues={{ username: "", password: "" }}
          submit={handleSubmit}
        >
          <FormInput
            label="Username"
            name="username"
            helperText={loginErrorMessage}
          />
          <br />
          <FormInput
            label="Password"
            name="password"
            type="password"
            helperText={loginErrorMessage}
          />
          <br />
          <br />
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Form>
      </div>
      <div className="registration-form">
        <h2>Register</h2>
        <Form
          formInitialValues={{ username: "", password: "", email: "" }}
          submit={handleRegistration}
        >
          <FormInput
            label="Username"
            name="username"
            helperText={registrationErrorMessage}
          />
          <br />
          <FormInput label="Password" name="password" type="password" />
          <br />
          <FormInput label="Email" name="email" />
          <br />
          <br />
          <Button type="submit" variant="contained">
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}
