import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
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
  const userDelete = (event) => {
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
        alert("Profile Deleted! You will be disconnected ...");
        onLoggedOut(user, token);
      } else {
        alert("Delete failed");
      }
    });
  };

  if (!userDetails3) {
    const token = localStorage.getItem("token");
    console.log("token: ", token);
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

        let u = usersFromApi.find((u) => u.Username === user.Username);
        setUserDetails3(u);
      });
  }

  let favoritesMovies = movies.filter((movie) =>
    userDetails3.FavoriteMovies.includes(movie.id)
  );

  return (
    <>
      {userDetails3 ? (
        <Row className="justify-content-md-left">
          <h3>User informations:</h3>
          <div> Username : {userDetails3.Username}</div>
          <div> Birthday: {userDetails3.Birthday}</div>
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
            <Button variant="outline-danger" onClick={userDelete}>
              Delete Account
            </Button>
          </div>
        </Row>
      ) : (
        <div> Loading </div>
      )}
    </>
  );
};
