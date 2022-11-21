import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/Context";

const Dashboard = () => {
   const { games, movies, fetchStatus, setFetchStatus, functions } =
      useContext(DataContext);

   const { fetchDataGame, fetchDataMovie } = functions;

   useEffect(() => {
      fetchDataGame();

      if (fetchStatus) {
         fetchDataGame();
         setFetchStatus(false);
      }
   }, [fetchStatus, setFetchStatus]);

   useEffect(() => {
      fetchDataMovie();

      if (fetchStatus) {
         fetchDataMovie();
         setFetchStatus(false);
      }
   }, [fetchStatus, setFetchStatus]);

   const colors = [
      "tag-blue",
      "tag-indigo",
      "tag-sky",
      "tag-red",
      "tag-orange",
   ];

   return (
      <div className="wrapper-dashboard">
         <div
            style={{
               width: "100%",
            }}
         >
            {movies !== null && (
               <>
                  <div className="total">
                     <h1>Movie</h1>
                     <p>{movies.length}</p>
                  </div>
                  <div className="group">
                     <p>Genre</p>
                     <div className="all-genre">
                        {movies
                           .map((movie) => movie.genre)
                           .join(" ")
                           .split(",")
                           .join(" ")
                           .split(" ")
                           .filter((item) => item)
                           .reduce((unique, item) => {
                              return unique.includes(item)
                                 ? unique
                                 : [...unique, item];
                           }, [])
                           .map((genre, i) => {
                              return (
                                 <span className={colors[i%colors.length]} key={i + 1}>
                                    {genre[0].toUpperCase() + genre.slice(1)}
                                 </span>
                              );
                           })}
                     </div>
                  </div>
                  <div className="group">
                     <p>Release</p>
                     <div className="all-release">
                        {movies
                           .sort((a, b) => {
                              return a.year - b.year;
                           })
                           .map((movie) => movie.year)
                           .reduce((unique, item) => {
                              return unique.includes(item)
                                 ? unique
                                 : [...unique, item];
                           }, [])
                           .map((year, i) => {
                              return (
                                 <span className={colors[i%colors.length]} key={i + 1}>
                                    {year}
                                 </span>
                              );
                           })}
                     </div>
                  </div>
               </>
            )}
         </div>
         <div
            style={{
               width: "100%",
            }}
         >
            {games !== null && (
               <>
                  <div className="total">
                     <h1>Game</h1>
                     <p>{games.length}</p>
                  </div>
                  <div className="group">
                     <p>Platform</p>
                     <div className="all-platform">
                        {games
                           .map((game) => game.genre)
                           .join(" ")
                           .split(",")
                           .join(" ")
                           .split(" ")
                           .filter((item) => item)
                           .reduce((unique, item) => {
                              return unique.includes(item)
                                 ? unique
                                 : [...unique, item];
                           }, [])
                           .map((genre, i) => {
                              return (
                                 <span className={colors[i%colors.length]} key={i + 1}>
                                    {genre[0].toUpperCase() + genre.slice(1)}
                                 </span>
                              );
                           })}
                     </div>
                  </div>
                  <div className="group">
                     <p>Release</p>
                     <div className="all-release">
                        {games
                           .sort((a, b) => {
                              return a.release - b.release;
                           })
                           .map((game) => game.release)
                           .reduce((unique, item) => {
                              return unique.includes(item)
                                 ? unique
                                 : [...unique, item];
                           }, [])
                           .map((release, i) => {
                              return (
                                 <span className={colors[i%colors.length]} key={i + 1}>
                                    {release}
                                 </span>
                              );
                           })}
                     </div>
                  </div>
               </>
            )}
         </div>
      </div>
   );
};

export default Dashboard;
