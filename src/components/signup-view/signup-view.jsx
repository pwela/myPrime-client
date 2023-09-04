import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [passwordcheck, setPasswordCheck] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (password != passwordcheck) {
      alert("Password must been identical!");
      return;
    }
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthdate: birthdate,
    };

    fetch("https://my-prime-movies-95318ccd1782.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Singup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          Placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          Placeholder="Type password"
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="6"
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          value={passwordcheck}
          Placeholder="Retype password"
          onChange={(e) => setPasswordCheck(e.target.value)}
          required
          minLength="6"
        />
      </Form.Group>
      <Form.Group controlId="formBirthdate">
        <Form.Label>Birthdate</Form.Label>
        <Form.Control
          type="date"
          value={birthdate}
          Placeholder="Select birthday"
          onChange={(e) => setBirthdate(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          Placeholder="Enter your mail"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
};
