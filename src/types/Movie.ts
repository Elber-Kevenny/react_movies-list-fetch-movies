export interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

export type MovieContextType = {
  movies: Movie[];
  movie: Movie | undefined;
  onQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
  onFiltered: (titleFilm: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleShowMoveList: (show: boolean) => void;
  handleAddToList: (titleFilm: string) => void;
  movielist: Movie[];
  handlehaveOnTheList: () => void;
  isLoading: boolean;
  handleErrorMessage: () => void;
  showLoader: boolean;
};
