import {collection, getDocs} from "firebase/firestore";
import {db} from "@/firebase/config";

async function getMovies(){
    const snap = await getDocs(collection(db, "movies"));
    return snap.docs.map(doc =>({
        id: doc.id,
        ...doc.data(),
    }));
}


export default  async function RecommenderPage(){
    const movies = await getMovies();
    return(
        <div>
            <h1>Recommender System</h1>
            {movies.map(movie =>(
                <div key={movie.id}>
                    <h2>{movie.title}</h2>
                    <p>{movie.description}</p>
                </div>
            ))
            }
        </div>
    )

}