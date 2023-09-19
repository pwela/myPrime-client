import React, { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export const ProfileView = ({
  userDetails,
  user,
  token,
  onLoggedOut,
  movies,
}) => {
  const [userDetails3, setUserDetails3] = useState(
    userDetails ? userDetails : null
  );
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const userDelete = () => {
    fetch(
      `https://my-prime-movies-95318ccd1782.herokuapp.com/users/${user.Username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.ok) {
        setShow(false);
        onLoggedOut(user, token);
      } else {
        alert("Delete failed");
      }
    });
  };

  if (!userDetails3) {
    const token = localStorage.getItem("token");
    fetch("https://my-prime-movies-95318ccd1782.herokuapp.com/users/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((users) => {
        const usersFromApi = users.map((user) => {
          return {
            id: user._id,
            Username: user.Username,
            Birthday: user.Birthday,
            Email: user.Email,
            FavoriteMovies: user.FavoriteMovies,
          };
        });

        const u = usersFromApi.find((u) => u.Username === user.Username);
        setUserDetails3(u);
      });
  }

  const favoritesMovies = movies.filter((movie) =>
    userDetails3.FavoriteMovies.includes(movie.id)
  );

  return (
    <>
      {userDetails3 ? (
        <Row className="justify-content-md-left mb-2">
          <h3>User informations:</h3>
          <div> Username : {userDetails3.Username}</div>
          <div> Birthday: {userDetails3.Birthday.slice(0, 10)}</div>
          <div> Email: {userDetails3.Email}</div>

          <>
            <h3 className="mt-4">Your favorite movies: </h3>
            {favoritesMovies.map((movie) => (
              <Col className="mb-4" key={movie.id} md={2}>
                <MovieCard
                  movie={movie}
                  userDetails={userDetails3}
                  user={user}
                  token={token}
                />
              </Col>
            ))}
          </>
          <div>
            <Link to={`/users/${encodeURIComponent(user.Username)}`}>
              <Button variant="link">Update user info</Button>
            </Link>
            <Button variant="outline-danger" onClick={handleShow}>
              Delete Account
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title>Confirm account delete?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Your account will be permanently deleted and you will be logged out.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="dark" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={userDelete}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Row>
      ) : (
        <div> Loading </div>
      )}
    </>
  );
};
