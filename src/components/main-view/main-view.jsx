import { useState, useEffect } from "react";
import { ProfileUpdate } from "../profile-update/profile-update";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BrowserRouter, Routes, Route, Navigate, json } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [userDetails, setUserDetails] = useState(null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!token) {
      return;
    }

    // fetch user and find logged user details
    fetch("https://my-prime-movies-95318ccd1782.herokuapp.com/users/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((users) => {
        const usersFromApi = users.map((user) => {
          return {
            id: user._id,
            Username: user.Username,
            Birthday: user.Birthday,
            Email: user.Email,
            FavoriteMovies: user.FavoriteMovies,
          };
        });

        let loggedUser = usersFromApi.find((u) => u.Username === user.Username);
        setUserDetails(loggedUser);
      });

    // fecth movies to the remote database with setMovies

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

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          console.log("Logging out and clearing variables");
          setUser(null);
          setToken(null);
          localStorage.clear();
          window.location.reload();
        }}
      />
      <Row className="justify-content-md-center mt-4">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user) => {
                        setUser(user);
                        window.location.reload();
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={10}>
                    <MovieView
                      movies={movies}
                      userDetails={userDetails}
                      user={user}
                      token={token}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
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
                )}
              </>
            }
          />
          <Route
            path="/user"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <ProfileView
                      movies={movies}
                      userDetails={userDetails}
                      user={user}
                      token={token}
                      onLoggedOut={() => {
                        console.log("Logging out and clearing variables");
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                        window.location.reload();
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/users/:Username"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <>
                    <ProfileView
                      movies={movies}
                      userDetails={userDetails}
                      user={user}
                      token={token}
                    />
                    <ProfileUpdate
                      userDetails={userDetails}
                      user={user}
                      token={token}
                      onLoggedOut={() => {
                        console.log("Logging out and clearing variables");
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                        window.location.reload();
                      }}
                    />
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
