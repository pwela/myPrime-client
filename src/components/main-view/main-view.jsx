import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [moviesGenre, setMoviesGenre] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // fecth movies to the remote database with setMovies
  useEffect(() => {
    if (!token) {
      return;
    }
    console.log("main fetch");
    fetch("https://my-prime-movies-95318ccd1782.herokuapp.com/movies/", {
      headers: { Authorization: `Bearer ${token}` },
    })
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
  }, [token]);

  if (!user) {
    return (
      <div>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </div>
    );
  }
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
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
    </div>
  );
};
