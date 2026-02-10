import React, { useContext } from 'react';

import './MoviesList.scss';
import { MovieCard } from '../MovieCard';
import { MovieContext } from '../moviecontext/moviecontext';

export const MoviesList: React.FC = () => {
  const context = useContext(MovieContext);

  const { movielist } = context;

  return (
    <div className="movies">
      {movielist &&
        movielist?.map(movie => <MovieCard key={movie.imdbId} movie={movie} />)}
    </div>
  );
};
