import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault(event);
    const user = {
      Username: username,
      Password: password,
    };

    const loginUrl =
      "https://my-prime-movies-95318ccd1782.herokuapp.com/login" +
      "?Username=" +
      user.Username +
      "&Password=" +
      user.Password;

    fetch(loginUrl, {
      method: "POST",
    })
      /*   fetch(
      "https://my-prime-movies-95318ccd1782.herokuapp.com/login",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    )*/
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("something went wrong: ", e);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="5"
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          placeholder="Type password"
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="6"
        />
      </Form.Group>
      <Button className="mt-3" variant="success" type="submit">
        Login
      </Button>
    </Form>
  );
};
