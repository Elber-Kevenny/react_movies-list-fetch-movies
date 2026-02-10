import { useEffect, useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { FindMovie } from './components/FindMovie';
import { Movie } from './types/Movie';
import { getMovie } from './api';
import { MovieContext } from './components/moviecontext/moviecontext';

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const [movielist, setMovielist] = useState<Movie[]>([]);
  const [haveOnTheList, setHaveOnTheList] = useState<boolean>(false);

  const [query, setQuery] = useState<string>('');
  const [showMovieList, setShowMovieList] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // console.log('query', query);

  const onQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // onfiltered pega o valor da query no form de findmovie e atualiza movie e movie é passado para moviecard
  const onFiltered = (titleFilm: string) => {
    setShowLoader(true);
    setTimeout(() => {
      const found = movies?.find(
        (
          f, // - .find → retorna um único objeto (ou undefined).
        ) => {
          const movieTitle = f.title.trim().toLowerCase();
          const normalized = titleFilm.trim().toLowerCase();

          return movieTitle.includes(normalized);
        },
      );

      if (found) {
        setMovie(found);
        setShowLoader(false);
      }
    }, 1000);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleShowMoveList = (show: boolean) => {
    setShowMovieList(show);
  };

  const fistSearchFilm = movies[0];

  const handlehaveOnTheList = () =>
    setHaveOnTheList(movielist.some(m => m.imdbId === fistSearchFilm?.imdbId));
  const handleErrorMessage = () => setIsLoading(movies.some(m => m.title));

  const handleAddToList = () => {
    // aqui adiciona o filme que esta em movie(movie é atualizado por onFiltered)
    if (!movie) {
      return;
    } else if (!haveOnTheList) {
      setMovielist(prev => [...prev, movie]);
    }

    setQuery('');
    setMovie(undefined);
  };

  /* console.log('filteredFilms', filteredFilms)
  console.log('movies', movies)
  console.log('movie', movie)
  console.log('movielist', movielist)
  console.log('haveOnTheList', haveOnTheList)
  console.log('fistSearchFilm', fistSearchFilm)
  console.log('isloadin', isLoading) */

  useEffect(() => {
    if (!query) {
      return;
    }

    getMovie(query) // getMovie precisa de query para econtrar o filme
      .then(result => {
        // then faz a busca, se o result(que é a busca) for bem sucedida(encontrou o filme) 'true'
        if (result.Response === 'True') {
          setIsLoading(true);
          const foundFilm: Movie = {
            title: result.Title,
            description: result.Plot,
            imdbUrl: `https://www.imdb.com/title/${result.imdbID}`,
            imgUrl:
              !result.Poster || result.Poster === 'N/A'
                ? `https://via.placeholder.com/360x270.png?text=no%20preview`
                : result.Poster,
            imdbId: result.imdbID,
          }; // atualiza o setMovies com o resultado da busca Search

          setMovies([foundFilm]);
        } else {
          setMovies([]);
        }
      })
      .catch(() => 'Error')
      .finally(() => setShowLoader(false));
  }, [query]);

  return (
    <MovieContext.Provider
      value={{
        showLoader,
        handlehaveOnTheList,
        movies,
        onQuery,
        query,
        onFiltered,
        handleSubmit,
        movie,
        handleShowMoveList,
        handleAddToList,
        movielist,
        isLoading,
        handleErrorMessage,
      }}
    >
      <div className="page">
        <div className="page-content">{showMovieList && <MoviesList />}</div>

        <div className="sidebar">
          <FindMovie />
        </div>
      </div>
    </MovieContext.Provider>
  );
};
