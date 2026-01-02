type Movie = {
  title: string;
  directors:string[];
  Year: string;
  Rated: string;
  released: string;
  runtimeMinutes: string | number | null;
  genres: string[];
  writers: string[];
  actors: string[];
  plot: string;
  languages: string[];
  countries: string[];
  awards: string;
  poster: string;
  Ratings: { Source: string; Value: string }[];
  metascore: string | number;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  rated:number| string;
  type: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: string;
  createdAt: Date| string| number;
};

type MoviesFile = {
  movies: Movie[];
};

export { type Movie, type MoviesFile };