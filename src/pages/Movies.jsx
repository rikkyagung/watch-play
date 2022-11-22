import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/Context";
import CardMovie from "../components/CardMovie";
import InputSearch from "../components/InputSearch";

export default function Movies () {
   const { movies, fetchStatus, setFetchStatus, search, setSearch, functions } =
      useContext(DataContext);

   const { fetchDataMovie, searchDataMovie } = functions;

   useEffect(() => {
      fetchDataMovie();

      if (fetchStatus) {
         fetchDataMovie();
         setFetchStatus(false);
      }
   }, [fetchStatus, setFetchStatus]);

   const onChangeSearch = (e) => {
      const target = e.target.value;
      setSearch(target);
   };

   const handleSearch = (e) => {
      e.preventDefault();
      searchDataMovie();
   };

   return (
      <div className="home-content">
         <div className="wrapper-heading-home">
            <h3 className="heading-home">Movie List</h3>
            <InputSearch
               onSubmit={handleSearch}
               onChange={onChangeSearch}
               value={search}
            />
         </div>
         <div className="container-home">
            {movies !== null && (
               <>
                  {movies.map((movie, i) => {
                     return <CardMovie props={movie} key={i + 1} />;
                  })}
               </>
            )}
         </div>
      </div>
   );
};
