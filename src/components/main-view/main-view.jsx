import { useState, useEffect } from "react";
//import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [moviesGenre, setMoviesGenre] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  // fecth movies to the remote database with setMovies
  useEffect(() => {
    fetch("https://my-prime-movies-95318ccd1782.herokuapp.com/movies/")
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((movie) => {
          return {
            id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Director: movie.Director,
            Genre: movie.Genre,
            Actors: movie.Actors,
            ImageUrl: movie.ImageUrl,
            Featured: movie.Featured,
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);

  if (selectedMovie) {
    // Filter movies by Genre and store it into similarMovieGenre.
    const similarMovieGenre = movies.filter((movie) => {
      return (
        movie.Genre.Name === selectedMovie.Genre.Name &&
        movie.Title != selectedMovie.Title
      );
    });

    return (
      <div>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        <h1> Similar movies</h1>
        <div>
          {similarMovieGenre.map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return <div>"There is no movie in the list</div>;
  }

  return (
    <div>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        );
      })}
    </div>
  );
};
