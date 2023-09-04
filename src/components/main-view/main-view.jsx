import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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

  function similarMovies(movie) {
    // Filter movies by Genre and store it into similarMovieGenre.

    return (
      movie.Genre.Name === selectedMovie.Genre.Name &&
      movie.Title != selectedMovie.Title
    );
  }

  return (
    <Row className="justify-content-md-center mt-4">
      {!user ? (
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          <hr />
          or
          <hr />
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
          <h1> Similar movies</h1>
          <Row>
            {movies.filter(similarMovies).map((movie) => {
              return (
                <Col key={movie.id} className="mb-4" md={3}>
                  <MovieCard
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                      setSelectedMovie(newSelectedMovie);
                    }}
                  />
                </Col>
              );
            })}
          </Row>
          <hr />
          <Button onClick={() => setSelectedMovie(null)}>
            Back to Main Screen
          </Button>
        </Col>
      ) : movies.length === 0 ? (
        <div>"There is no movie in the list</div>
      ) : (
        <>
          {movies.map((movie) => {
            return (
              <Col key={movie.id} className="mb-4" md={3}>
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            );
          })}

          <hr />
          <Button
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logout
          </Button>
        </>
      )}
    </Row>
  );
};
