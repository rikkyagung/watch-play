import React, { useEffect } from "react";
import { useContext } from "react";
import { DataContext } from "../context/Context";
import { Link } from "react-router-dom";
import CardGame from "../components/CardGame";
import CardMovie from "../components/CardMovie";

export default function Home() {
   const { movies, games, fetchStatus, setFetchStatus, functions } =
      useContext(DataContext);

   const { fetchDataMovie, fetchDataGame } = functions;

   useEffect(() => {
      fetchDataMovie();

      if (fetchStatus) {
         fetchDataMovie();
         setFetchStatus(false);
      }
   }, []);

   useEffect(() => {
      fetchDataGame();

      if (fetchStatus) {
         fetchDataGame();
         setFetchStatus(false);
      }
   }, []);

   return (
      <>
         <div className="home-content">
            <div className="wrapper-heading-home">
               <h1 className="heading-home">Popular Movie</h1>
               <Link to={"/movies"}>
                  <button className="all-list">See All</button>
               </Link>
            </div>
            <div className="container-home">
               {movies !== null && (
                  <>
                     {movies
                        // filter berdasarkan rating tertinggi ke terendah
                        .sort((a, b) => {
                           return b.rating - a.rating;
                        })
                        // potong untuk menampilkan hanya 4 data dari semua data yang ada
                        .slice(0, 5)
                        .map((movie, i) => {
                           return <CardMovie props={movie} key={i + 1} />;
                        })}
                  </>
               )}
            </div>
         </div>

         <div className="home-content">
            <div className="wrapper-heading-home">
               <h1 className="heading-home">New Movie</h1>
               <Link to={"/movies"}>
                  <button className="all-list">See All</button>
               </Link>
            </div>
            <div className="container-home">
               {movies !== null && (
                  <>
                     {movies
                        .sort((a, b) => {
                           return b.id - a.id;
                        })
                        .slice(0, 5)
                        .map((movie, i) => {
                           return <CardMovie props={movie} key={i + 1} />;
                        })}
                  </>
               )}
            </div>
         </div>

         <div className="home-content">
            <div className="wrapper-heading-home">
               <h1 className="heading-home">New Game</h1>
               <Link to={"/games"}>
                  <button className="all-list">See All</button>
               </Link>
            </div>
            <div className="container-home">
               {games !== null && (
                  <>
                     {games
                        .sort((a, b) => {
                           return b.id - a.id;
                        })
                        .slice(0, 5)
                        .map((game, i) => {
                           return <CardGame props={game} key={i + 1} />;
                        })}
                  </>
               )}
            </div>
         </div>
      </>
   );
}
