import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Movie } from "@/types/Movie";

export async function saveMovie(movie: Movie) {
  const ref = doc(db, "movies", movie.imdbID);
  await setDoc(ref, movie, { merge: true });
}


