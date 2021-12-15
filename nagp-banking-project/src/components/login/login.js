import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserHistory } from "history";

import "./login.css";
import axios from "axios";
import { Redirect } from "react-router";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = createBrowserHistory({ forceRefresh: true });

  function validateForm() {
    return username.length >= 4 && password.length >= 4;
  }

  function authenticate() {
    axios
      .get(
        "http://localhost:3010/users?username=" +
          username.toUpperCase() +
          "&passowrd=" +
          password
      )
      .then((result) => {
        if (result.data.length > 0) {
          localStorage.setItem("authenticated", "yes");
          localStorage.setItem("username", username);
          console.log(props);
          history.push("/");
        } else {
          setError("Incorrect Username/Password combination.");
        }
      })
      .catch((error) => setError(error));
  }
  function handleSubmit(event) {
    event.preventDefault();
    authenticate();
  }
  function reset(event) {
    setUsername("");
    setPassword("");
    setError("");
  }
  if (localStorage.getItem("authenticated") === "yes") {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="Login">
        <div className="one">
          <h1>Bank Account Login</h1>
        </div>
        <br />
        <br />
        <Form style={{ textAlign: "left" }} onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="username">
            <Form.Label>Username (Min 4 characters) :</Form.Label>
            <Form.Control
              style={{ marginBottom: "4%" }}
              autoFocus
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password (Min 4 characters) :</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: "4%" }}
            />
          </Form.Group>
          <Form.Label style={{ color: "red" }}>{error}</Form.Label>
          <div style={{ textAlign: "center" }}>
            <Button
              block="true"
              size="lg"
              type="submit"
              style={{ marginRight: "4%" }}
              disabled={!validateForm()}
            >
              Login
            </Button>
            <Button block="true" size="lg" type="reset" onClick={reset}>
              Reset
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
