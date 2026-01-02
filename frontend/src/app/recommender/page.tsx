import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import type { Movie } from "@/types/movie";
import RecommenderClient from "@/app/recommender/RecommenderClient";

function serializeMovie(movie: any): Movie {
  return {
    ...movie,
    createdAt: movie.createdAt?.toMillis?.() ?? null,
  };
}


async function getMovies(): Promise<Movie[]> {
  const snap = await getDocs(collection(db, "movies"));

  return snap.docs.map(doc =>
  serializeMovie({
   id: doc.id,
    ...(doc.data() as Omit<Movie, "id">),
  })
  );
}

export default async function RecommenderPage() {
  const movies = await getMovies();

  return (
    <div>
      <RecommenderClient movies={movies} />
    </div>
  );
}
