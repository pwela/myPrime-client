// PropTypes libray import
//import PropTypes from "props-type"; To install proptypes, run the command "npm install prop-types@15.8.1' in the CLI

import { MovieCard } from "../movie-card/movie-card";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MovieView = ({ movies, user, userDetails, token }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  const similarMovies = movies.filter((m) => {
    return m.Genre.Name === movie.Genre.Name && m.Title != movie.Title;
  });

  console.log(similarMovies);

  return (
    <Row className="justify-content-md-left">
      <div>
        <img src={movie.ImageUrl} alt="Movie image" />
      </div>
      <div>
        <h3> Title: {movie.Title}</h3>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <h3> Director Details: </h3>
      <div>
        <h6> Name: {movie.Director.Name}</h6>
        <span>
          Birth: {movie.Director.Birth} - Death: {movie.Director.Death}{" "}
        </span>
      </div>
      <div>
        <span>Bio :</span>
        <span>{movie.Director.Bio}</span>
      </div>

      <div>
        <h3> Genre info: </h3>
        <h6>Genre name : {movie.Genre.Name}</h6>

        <span>Genre Description :</span>
        <span>{movie.Genre.Description}</span>
      </div>
      <hr className="mt-4" />
      <>
        <h2> Similar movies</h2>
        {similarMovies.map((movie) => (
          <Col className="mb-4" key={movie.id} md={3}>
            <MovieCard
              movie={movie}
              userDetails={userDetails}
              user={user}
              token={token}
            />
          </Col>
        ))}
      </>
      <Link to={`/`}>
        <Button className="back-button">Back to homepage</Button>
      </Link>
    </Row>
  );
};
