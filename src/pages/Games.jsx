import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/Context";
import CardGame from "../components/CardGame";
import InputSearch from "../components/InputSearch";

export default function Game() {
   const { games, fetchStatus, setFetchStatus, search, setSearch, functions } =
      useContext(DataContext);

   const { fetchDataGame, searchDataGame } = functions;

   useEffect(() => {
      fetchDataGame();
      // const fetchData = async () => {
      //    let { data } = await axios.get(
      //       `https://backendexample.sanbersy.com/api/data-game`
      //    );
      //    setGame([...data]);
      // };

      if (fetchStatus) {
         fetchDataGame();
         setFetchStatus(false);
      }
   }, [fetchStatus, setFetchStatus]);

   const onChangeSearch = (e) => {
      const target = e.target.value;
      setSearch(target);
   };

   const handleSearch = (e) => {
      e.preventDefault();
      searchDataGame();
   };

   return (
      <div className="home-content">
         <div className="wrapper-heading-home">
            <h3 className="heading-home">Game List</h3>
            <InputSearch
               onSubmit={handleSearch}
               onChange={onChangeSearch}
               value={search}
            />
         </div>
         <div className="container-home">
            {games !== null && (
               <>
                  {games.map((game, i) => {
                     return <CardGame props={game} key={i + 1} />;
                  })}
               </>
            )}
         </div>
      </div>
   );
}
