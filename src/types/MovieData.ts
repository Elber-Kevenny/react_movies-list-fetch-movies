import { Movie } from './Movie';

export interface MovieData {
  Poster: string;
  Title: string;
  Plot: string;
  imdbID: string;
  Response: 'True';
  Search: Movie[];
}
