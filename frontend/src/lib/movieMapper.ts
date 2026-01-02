import { Movie } from "@/types/Movie";

export function mapOmdbToMovie(raw: any, id: number): Movie {
  return {
    id,
    imdbID: raw.imdbID,

    title: raw.Title,
    description: raw.Plot,

    Year: raw.Year,
    Rated: raw.Rated,
    Released: raw.Released,
    Runtime: raw.Runtime,

    Genre: raw.Genre?.split(", ").filter(Boolean) ?? [],
    Director: raw.Director?.split(", ").filter(Boolean) ?? [],
    Writer: raw.Writer?.split(", ").filter(Boolean) ?? [],
    Actors: raw.Actors?.split(", ").filter(Boolean) ?? [],

    Language: raw.Language?.split(", ").filter(Boolean) ?? [],
    Country: raw.Country?.split(", ").filter(Boolean) ?? [],

    Awards: raw.Awards,
    Poster: raw.Poster,

    Ratings: raw.Ratings ?? [],

    Metascore: raw.Metascore,
    imdbRating: raw.imdbRating,
    imdbVotes: raw.imdbVotes,

    Type: raw.Type,
    DVD: raw.DVD,
    BoxOffice: raw.BoxOffice,
    Production: raw.Production,
    Website: raw.Website,

    createdAt: Date.now(),
  };
}

