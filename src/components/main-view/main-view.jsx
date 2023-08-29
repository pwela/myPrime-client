import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: "64d7cf5ababfb5b3fd2fe0d7",
      Title: "Eyes Wide Shut",
      Description:
        "Eyes Wide Shut is a 1999 erotic mystery psychological drama film directed, produced, and co-written by Stanley Kubrick.It is based on the 1926 novella Traumnovelle(Dream Story) by Arthur Schnitzler, transferring the story's setting from early twentieth-century Vienna to 1990s New York City. The plot centers on a doctor (Tom Cruise) who is shocked when his wife (Nicole Kidman) reveals that she had contemplated having an affair a year earlier. He then embarks on a night-long adventure, during which he infiltrates a masked orgy of an unnamed secret society.",
      Director: {
        Name: "Stanley Kubrick",
        Bio: "Stanley Kubrick (July 26, 1928 – March 7, 1999) was an American film director, producer, screenwriter and photographer.",
        Birth: 1928,
        Death: 1999,
      },
      Genre: {
        Name: "Drama",
        Description:
          "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone. Drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre, such as soap opera, police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy).",
      },
      ImageUrl:
        "https://upload.wikimedia.org/wikipedia/en/7/73/Eyes_Wide_Shut_%281999%29.png",
      Featured: true,
    },
    {
      id: "64d7d096babfb5b3fd2fe0d8",
      Title: "Full Metal Jacket",
      Description:
        "Full Metal Jacket is a 1987 war drama film directed and produced by Stanley Kubrick, who also co-wrote the screenplay with Michael Herr and Gustav Hasford. The film is based on Hasford's 1979 novel The Short-Timers and stars Matthew Modine, Lee Ermey, Vincent D'Onofrio and Adam Baldwin.",
      Director: {
        Name: "Stanley Kubrick",
        Bio: "Stanley Kubrick (July 26, 1928 – March 7, 1999) was an American film director, producer, screenwriter and photographer.",
        Birth: 1928,
        Death: 1999,
      },
      Genre: {
        Name: "Drama",
        Description:
          "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone. Drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre, such as soap opera, police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy).",
      },
      ImageUrl:
        "https://upload.wikimedia.org/wikipedia/en/9/99/Full_Metal_Jacket_poster.jpg",
      Featured: false,
    },

    {
      id: "64d7d18cbabfb5b3fd2fe0d9",
      Title: "The Shining",
      Description:
        "The Shining is a 1980 supernatural horror film produced and directed by Stanley Kubrick and co-written with novelist Diane Johnson. The film is based on Stephen King's 1977 novel of the same name and stars Jack Nicholson, Danny Lloyd, Shelley Duvall, and Scatman Crothers.",
      Director: {
        Name: "Stanley Kubrick",
        Bio: "Stanley Kubrick (July 26, 1928 – March 7, 1999) was an American film director, producer, screenwriter and photographer.",
        Birth: 1928,
        Death: 1999,
      },
      Genre: {
        Name: "Psychological horror",
        Description:
          "Psychological horror is a subgenre of horror and psychological fiction with a particular focus on mental, emotional, and psychological states to frighten, disturb, or unsettle its audience. The subgenre frequently overlaps with the related subgenre of psychological thriller, and often uses mystery elements and characters with unstable, unreliable, or disturbed psychological states to enhance the suspense, drama, action, and paranoia of the setting and plot and to provide an overall creepy, unpleasant, unsettling, or distressing atmosphere.",
      },
      ImageUrl:
        "https://upload.wikimedia.org/wikipedia/en/1/1d/The_Shining_%281980%29_U.K._release_poster_-_The_tide_of_terror_that_swept_America_IS_HERE.jpg",
      Featured: true,
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
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
