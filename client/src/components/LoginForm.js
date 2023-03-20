import React from "react";
import FormInput from "./FormInput";
import Form from "./Form";
import Button from "@mui/material/Button";
import ClientAPI from "../helpers/ClientAPI";
import Local from "../helpers/Local";
import "./LoginForm.css";

// TODO - Navigate to dashboard
export default function LoginForm({ doRegister }) {
  async function handleSubmit(form) {
    const response = await ClientAPI.loginUser(form.username, form.password);
    Local.saveUserInfo(response.data.token, response.data.user);
  }

  // TODO - Navigate to secondary registration
  async function handleRegistration(form) {
    doRegister(form.username, form.email, form.password);
  }

  return (
    <div className="LoginForm">
      <div className="login-form">
        <h2>Login</h2>
        <Form
          formInitialValues={{ username: "", password: "" }}
          submit={handleSubmit}
        >
          <FormInput label="Username" name="username" />
          <br />
          <FormInput label="Password" name="password" type="password" />
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
          <FormInput label="Username" name="username" />
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
