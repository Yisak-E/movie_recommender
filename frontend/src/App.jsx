
import './general.css'
import MovieList from './components/MovieList'
import Footer from './components/Footer'

import './App.css'
import {useRef, useState} from "react";



function App() {
    const movieListRef = useRef();
    const [movieName, setMovieName] = useState("");

    const handleSearch = () => {
        movieListRef.current?.searchMovie(movieName);
        setMovieName("");
    };


    return (


      <div className={'container-fluid'}>
            <header className={'flex-row'}>
                {}
        <h1 className={'left mr-5 title'}>Movie Recommender</h1>
            <form action="">
                <input type="text"
                       className={'search_bar'}
                       placeholder="Search movies..."
                       value={movieName}
                       onChange={(e)=>{
                            setMovieName(e.target.value);

                       }} />
                <button type="submit"
                        onClick={(e)=>{
                             e.preventDefault();
                            handleSearch()}}
                >Search</button>
            </form>
                <button className={'ml-2 mb-3'}> Upload</button>
        </header>


        <main className={ 'main-content'}>
               <MovieList ref={movieListRef} />

        </main>

       <Footer />
      </div>


    )
}

export default App
