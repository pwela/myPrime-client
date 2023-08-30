// PropTypes libray import
//import PropTypes from "props-type"; To install proptypes, run the command "npm install prop-types@15.8.1' in the CLI

import PropTypes from "prop-types";
export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.ImageUrl} alt="Movie image" />
      </div>
      <div>
        <span> Title: </span>
        <span> {movie.Title} </span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <h1> Director Details: </h1>
      <div>
        <span>Name :</span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Bio :</span>
        <span>{movie.Director.Bio}</span>
        <div>
          <span> Birth: </span>
          <span> {movie.Director.Birth}</span>
          <span> - Death: </span>
          <span> {movie.Director.Death}</span>
        </div>
      </div>

      <h1> Genre info: </h1>
      <div>
        <span>Genre name :</span>
        <span>{movie.Genre.Name}</span>
        <div>
          <span>Genre Description :</span>
          <span>{movie.Genre.Description}</span>
        </div>
      </div>
      <button onClick={onBackClick}>Back to Main Screen</button>
    </div>
  );
};

// prop constraints for MovieCard

MovieView.propTypes = {
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
  onBackClick: PropTypes.func.isRequired,
};
