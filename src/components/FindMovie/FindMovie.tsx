import React, { useContext, useState } from 'react';
import './FindMovie.scss';
import { MovieCard } from '../MovieCard';
import { MovieContext } from '../moviecontext/moviecontext';
import classNames from 'classnames';

export const FindMovie: React.FC = () => {
  const [showMovieCard, setShowMovieCard] = useState<boolean>(false);

  const handleShowMovieCard = (show: boolean) => {
    setShowMovieCard(show);
  };

  const context = useContext(MovieContext);
  const {
    movies,
    showLoader,
    onQuery,
    query,
    onFiltered,
    handleSubmit,
    movie,
    handleShowMoveList,
    handleAddToList,
    handlehaveOnTheList,
    isLoading,
    handleErrorMessage,
  } = context;

  let disabled = false; // disabled desativa o que for verdadeiro e ativa o que for falso

  if (query.length === 0) {
    disabled = true;
  }

  return (
    <>
      <form
        className="find-movie"
        onSubmit={event => {
          handlehaveOnTheList();
          handleErrorMessage();
          handleSubmit(event);
          onFiltered(query);
          handleShowMovieCard(true);
        }}
      >
        <div className="field">
          <label className="label" htmlFor="movie-title">
            Movie title
          </label>

          <div className="control">
            <input
              data-cy="titleField"
              type="text"
              id="movie-title"
              value={query}
              placeholder="Enter a title to search"
              className={classNames('input', {
                'is-danger':
                  movies?.length === 0 && query.length !== 0 && !isLoading,
              })}
              onChange={onQuery}
            />
          </div>

          {movies?.length === 0 && query.length !== 0 && !isLoading && (
            <p className="help is-danger" data-cy="errorMessage">
              Can&apos;t find a movie with such a title
            </p>
          )}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              data-cy="searchButton"
              type="submit"
              className={classNames('button is-light', {
                'is-loading': showLoader,
              })}
              disabled={disabled}
            >
              {!movie ? 'Find a movie' : 'Search again'}
            </button>
          </div>

          <div className="control">
            {movie && (
              <button
                data-cy="addButton"
                type="button"
                className="button is-primary"
                onClick={() => {
                  handleShowMovieCard(false);
                  handleShowMoveList(true);
                  handleAddToList();
                }}
              >
                Add to the list
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="container" data-cy="previewContainer">
        {showMovieCard /*- O React não permite retornar dois elementos irmãos (<h2> e <MovieCard>)
        diretamente depois do &&. - O operador lógico && só aceita um único nó JSX.
          depois do && devo colocar parenteses e envolver os elementos em <> </>
 */ && (
          <>
            {movie && <h2 className="title">Preview</h2>}
            {movie && <MovieCard movie={movie} />}
          </>
        )}
      </div>
    </>
  );
};
