'use client';

import { motion } from 'framer-motion';
import Image from "next/image";
import React, {useEffect, useState} from 'react';
import { Movie } from '@/types/movie';
import Blured from "@/animations/Blured";
import GradualSpacing from "@/animations/GradualSpacing";

type RecommenderClientProps = {
    movies?: Movie[];
}


export default function RecommenderClient({ movies }:  RecommenderClientProps) {
    const [activeMovie, setActiveMovie] = useState<Movie | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = React.useRef<HTMLDivElement>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [ filteredMovies, setFilteredMovies] = useState<Movie[]>(movies ?? []);

    useEffect(() => {
      if (isModalOpen) {
        modalRef.current?.focus();
      }
    }, [isModalOpen]);

    useEffect(() => {
        if(!movies) return;

        const search = searchTerm.trim().toLowerCase();

        if(!search){
            setFilteredMovies(movies);
            return;
        }

        const filtered = movies.filter(movie =>
            movie.title.toLowerCase().includes(search) ||
            movie.genres.some(genre => genre.toLowerCase().includes(search)) ||
            movie.directors.some(director => director.toLowerCase().includes(search)) ||
            movie.actors.some(actor => actor.toLowerCase().includes(search)) ||
            movie.year?.toString().includes(search)
        );

        setFilteredMovies(filtered);
    }, [searchTerm, movies]);



    const handleAction = (movieToShow:Movie) => {
        setIsModalOpen(true);
        setActiveMovie(movieToShow);
    };



    return (
       <main className={ 'container-fluid px-4 py-8 min-h-screen bg-linear-to-b from-black via-transparent to-black'}>
          <div className={"flex justify-between items-center"}>
              <Blured text={"Mirada Movie Recommender"} className={"text-5xl font-serif italic mb-8 text-center"}/>
              <input type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    title="Search by title, genre, director, actor, or year"
                    className={"border  rounded-3xl p-4 w-xl"}/>

          </div>
          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6 ${isModalOpen ? 'pointer-events-none blur-sm':''}`}>
               { filteredMovies  && filteredMovies.map(movie => (
                <MovieCard key={movie.imdbID + movie.title} movie={movie}  onSelect={handleAction}/>
              ))}
          </div>
           {isModalOpen && activeMovie && (
               <div
                    ref={modalRef}
                      tabIndex={-1}
                      role="dialog"
                      aria-modal="true"
                   className={"fixed top-35 z-50 inset-0 h-170 w-5xl mx-auto  bg-brown-400/40 backdrop-blur-lg animate-gradient-xy p-6 border has-focus-within: rounded-lg shadow-lg"}>
                  <div className={"flex justify-between"}>
                       <GradualSpacing text={activeMovie.title} className={"text-4xl font-serif italic"}/>
                    <button className={"mt-4 font-serif px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 hover:cursor-pointer"}
                                        onClick={() => setIsModalOpen(false)}>
                                    X
                                </button>
                  </div>
                   <div className={"grid grid-cols-1 md:grid-cols-2 gap-3  mt-4"}>
                       <div className={"col-span-1 flex justify-center items-center"}>
                            <Image src={activeMovie.poster} alt={activeMovie.title + activeMovie.year}
                                    width={300} height={450} className={" my-4 rounded-lg shadow-lg "}/>
                       </div>
                       <div className={"col-span-1 text-lg bg-gray-600/60 p-4 rounded-lg shadow-md "}>
                          <div className={"h-136 overflow-scroll"}>
                                <p><strong>Title:</strong> {activeMovie.title} ({activeMovie.year})</p>
                                <p><strong>Genre:</strong> {
                                    activeMovie.genres.map(genre =>{
                                        return genre + ", ";
                                    }
                                    )
                                }</p>
                                <p><strong>Director:</strong> {activeMovie.directors}</p>
                                <p><strong>Actors:</strong> {activeMovie.actors}</p>
                                <p className={"border-gray-500 my-3 p-4 rounded-3xl bg-black/50"}><strong>Plot:</strong> {activeMovie.plot}</p>
                                <p><strong>Language:</strong> {activeMovie.languages}</p>
                                <p><strong>Awards:</strong> {activeMovie.awards}</p>
                                <p><strong>IMDB Rating:</strong> {activeMovie.imdbRating}</p>

                          </div>

                       </div>
                   </div>

               </div>
           )}

       </main>
    );
}

type MovieCardProps = {
    movie: Movie;
    onSelect: (mov: Movie) => void;
}

const MovieCard = ({ movie, onSelect }: MovieCardProps) => {
    return (
        <div
            onClick={()=>onSelect(movie)}
            className="border p-4 rounded-lg shadow-md mb-4 bg-linear-to-br from-gray-700 to-gray-950" >
            <h2 className="text-xl font-bold mb-2 text-center">{movie.title} ({movie.year})</h2>
            <motion.div
                initial={{
                        scale: 0,
                        rotate: 0,
                        x: 100,
                        opacity: 0.5
                  }}
                  animate={{
                        scale: 1,
                        rotate: 360,
                        x: 0,
                        opacity: 1,
                  }}
                  transition={{
                        duration: 1,
                        ease: "easeOut"
                  }}

                className="mb-4 flex justify-center">
                <Image
                src={movie.poster !== "N/A" ? movie.poster : "https://via.placeholder.com/200x300?text=No+Image"}
                alt={movie.title}
                width={200}
                height={300}
                className="mb-4"
            />
            </motion.div>
            <p className="mb-2"><strong>Genre:</strong> {
                movie.genres.map(genre =>{
                return genre + ", ";
                })
            }</p>
            <p className="mb-2"><strong>Director:</strong> {movie.directors}</p>
            <p className="mb-2"><strong>Actors:</strong> {movie.actors}</p>
        </div>
    );
}