import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import type { Movie } from "@/types/movie";

async function getMovies(): Promise<Movie[]> {
  const snap = await getDocs(collection(db, "movies"));

  return snap.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Movie, "id">),
  }));
}

export default async function RecommenderPage() {
  const movies = await getMovies();

  return (
    <div>
      <h1>Recommender System</h1>

      {movies.map(movie => (
        <div key={movie.id}>
          <h2 className={"text-lg font-bold "}>{movie.title}</h2>
          <p className={"p-4 text-black"}>{movie.plot ?? movie.description}</p>
          <img src={movie.poster} alt={movie.title}/>
          <p>IMDB Rating: {movie.imdbRating}</p>
          <p>actors: {movie.actors && movie.actors.map(actor =>(
            <span key={actor} className="mr-2 text-blue-900 font-semibold italic">{actor}</span>
          ))}</p>
        </div>
      ))}
    </div>
  );
}
