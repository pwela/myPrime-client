import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar className="rounded mt-1" bg="primary" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: "black" }}>
          MyPrime
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav variant="underline" className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login" style={{ color: "white" }}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" style={{ color: "white" }}>
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/" style={{ color: "white" }}>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/user" style={{ color: "white" }}>
                  My Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut} style={{ color: "white" }}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
