import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const ProfileUpdate = ({ userDetails, user, token, onLoggedOut }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [passwordcheck, setPasswordCheck] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const disconnect = () => {
    setShow(false);
    onLoggedOut(user, token);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== passwordcheck) {
      alert("Password must been identical!");
      return;
    }
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    console.log(user);
    console.log(userDetails);
    fetch(
      `https://my-prime-movies-95318ccd1782.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.ok) {
        setShow(true);
      } else {
        alert("Update failed");
      }
    });
  };

  return (
    <Row>
      <Col className="justify-content-md-center" md={5}>
        <Form onSubmit={handleSubmit} >
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              minLength="3"
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Type password"
              onChange={(e) => setPassword(e.target.value)}
              minLength="6"
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={passwordcheck}
              placeholder="Retype password"
              onChange={(e) => setPasswordCheck(e.target.value)}
              minLength="6"
            />
          </Form.Group>
          <Form.Group controlId="formBirthdate">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              placeholder="Select birthday"
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter your mail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Button variant="success" type="submit" className="mt-3 mb-3">
            Update Profile
          </Button>
        </Form>
      </Col>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Account update succesfull!</Modal.Title>
        </Modal.Header>
        <Modal.Body>You will be disconnected to reload your user info...</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={disconnect}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};
