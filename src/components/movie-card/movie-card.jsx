// PropTypes libray import
//import PropTypes from "props-type"; To install proptypes, run the command "npm install prop-types@15.8.1' in the CLI
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
// MovieCard function component
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImageUrl} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant="link">
          Details..
        </Button>
      </Card.Body>
    </Card>
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
