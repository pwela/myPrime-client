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
