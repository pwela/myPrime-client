// PropTypes libray import
//import PropTypes from "props-type"; To install proptypes, run the command "npm install prop-types@15.8.1' in the CLI
import PropTypes from "prop-types";
// MovieCard function component
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <img
      src={movie.ImageUrl}
      onClick={() => {
        onMovieClick(movie);
      }}
    />

    // <div>
    //   <h4>Movie Card</h4>
    //   <button
    //     onClick={() => {
    //       onMovieClick(movie);
    //     }}
    //   >
    //     {movie.Title}
    //   </button>
    // </div>
  );
};

// prop constraints for MovieCard

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
  onMovieClick: PropTypes.func.isRequired,
};
