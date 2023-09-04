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

      <h3> Genre info: </h3>
      <div>
        <h6>Genre name : {movie.Genre.Name}</h6>
        <div>
          <span>Genre Description :</span>
          <span>{movie.Genre.Description}</span>
        </div>
      </div>
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
