

import React from "react";
// PropTypes libray import
//import PropTypes from "props-type"; To install proptypes, run the command "npm install prop-types@15.8.1' in the CLI
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

// MovieCard function component
export const MovieCard = ({ movie, userDetails, user, token }) => {
  const addFavoritesMovies = () => {
    if (userDetails.FavoriteMovies.includes(movie.id)) {
      alert("Movies already existing in favorite list");
    } else {
      fetch(
        `https://my-prime-movies-95318ccd1782.herokuapp.com/users/${user.Username}/movies/${movie.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        if (response.ok) {
          //  alert("Movie Added in favorites...");
          // onLoggedOut(user, token);
          window.location.reload();
        } else {
          alert("failed to add movie");
        }
      });
    }
  };

  const removeFavoritesMovies = () => {
    if (userDetails.FavoriteMovies.includes(movie.id)) {
      fetch(
        `https://my-prime-movies-95318ccd1782.herokuapp.com/users/${user.Username}/movies/${movie.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        if (response.ok) {
          // alert("Movie removed from favorites...");
          // onLoggedOut(user, token);
          window.location.reload();
        } else {
          alert("failed to remove movie");
        }
      });
    } else {
      alert("Movies not existing in favorite list");
    }
  };

  return (
    <Card border="primary" className="h-100 justify-content-around">
      <Card.Img variant="top" src={movie.ImageUrl} />
      <Card.Body className="pb-1 mb-1 border-bottom-0">
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <div className="d-flex align-items-end justify-content-between flex-wrap">
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button variant="link" size="sm">
              Details..
            </Button>
          </Link>
          {userDetails.FavoriteMovies.includes(movie.id) ? (
            <Button
              Button
              variant="danger"
              size="sm"
              onClick={removeFavoritesMovies}
            >
              Remove Fav
            </Button>
          ) : (
            <Button
              variant="success"
              size="sm"
              onClick={addFavoritesMovies}
            >
              Add Fav
            </Button>
          )}
        </div>

      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    ImageUrl: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
    }).isRequired,
    Actors: PropTypes.array.isRequired,
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
};
