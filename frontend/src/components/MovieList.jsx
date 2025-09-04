import imglink from "../assets/imglink.jpg";
import {useEffect, useState} from "react";
import moviesList from '../data/movies.json'
import React, { useImperativeHandle, forwardRef } from 'react';




 const MovieList = forwardRef((props, ref) => {


    const [count, setCount] = useState(0);
    const movieArray = moviesList.movies;
    const [currentMovie, setCurrentMovie] = useState(movieArray[count]);


    useImperativeHandle(ref, () => ({
    searchMovie: (movieName) => {
      console.log("Searching movie list...");
        const foundMovie = movieArray.find(movie => movie.title.toLowerCase().includes(movieName.toLowerCase()));
        if (foundMovie) {
            setCurrentMovie(foundMovie);
            setCount(movieArray.indexOf(foundMovie));
        } else {
            alert("Movie not found!");
        }
    }
  }));


    return (
        <>
        <section id='recommendations' className={"left_column"}>

            <div  className="column">
                <div className="image-container">
                     <img src={currentMovie.image_url ? currentMovie.image_url : imglink} alt={currentMovie.title} className="movie-image"/>
                </div>

                <button className={'mr-3 mt-3'}
                        onClick={() => {
                            if (count > 0) {
                                setCount(count - 1);
                            }
                            else{
                                setCount(movieArray.length - 1);
                            }
                            setCurrentMovie( movieArray[count]);
                        }}
                >prev</button>


                 <button className={'ml-3'}
                 onClick={() => {
                        if (count < movieArray.length - 1) {
                            setCount(count + 1);
                        } else {
                            setCount(0);
                        }
                        setCurrentMovie( movieArray[count]);
                 }}
                 >next</button>

            </div>
         </section>
           <section id='recommendations' className={"right_column"}>
            <div className={'left-align'}>
            <h3 className={'text-base sm:text-lg md:text-xl lg:text-2xl'}>Title: {currentMovie["title"]}</h3>
                 <h4 >Genre: {currentMovie.genre.join()}</h4>
                  Rating: {currentMovie.rating} <br/>
                <p className="movie-description left-align">
                     Brief Description: {currentMovie.description}
                 </p>
                <h4 className={'mt-3 text-lg bold italic'}>Cast</h4>
               <ul className="list-disc list-inside mt-3">
                  {currentMovie.actors.map((actor, i) => (
                    <li key={i} className={' text-left'}>
                      <strong>{actor.name}</strong> as <em>{actor.role}</em>
                    </li>
                  ))}
                </ul>

            </div>
            </section>
        </>
    )
 });
    export default MovieList;