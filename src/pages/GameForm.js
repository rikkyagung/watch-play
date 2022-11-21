import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../context/Context";

const GameForm = () => {
   const { inputGame, setInputGame, currentId, setCurrentId, functions } =
      useContext(DataContext);

   const { fetchDataEditGame, functionSubmitGame, functionEditGame } =
      functions;

   let { slug } = useParams();

   useEffect(() => {
      fetchDataEditGame(slug);

      setInputGame({
         name: "",
         genre: "",
         platform: "",
         release: 0,
         image_url: "",
         singlePlayer: "",
         multiplayer: "",
      });
      setCurrentId(null);
   }, [slug]);

   const handleChange = (e) => {
      const value = e.target.value;
      const name = e.target.name;
      const player = ["singlePlayer", "multiplayer"];

      if (player.indexOf(name) === -1) {
         setInputGame({ ...inputGame, [name]: value });
      } else {
         setInputGame({ ...inputGame, [name]: !inputGame[name] });
      }
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      if (currentId === null) {
         functionSubmitGame();
      } else {
         functionEditGame(currentId);
      }
   };

   return (
      <div className="wrapper-form">
         <form method="post" onSubmit={handleSubmit} className="form-movie">
            <label>Name</label>
            <input
               type="text"
               name="name"
               value={inputGame.name}
               onChange={handleChange}
               required
            />
            <label>Genre</label>
            <input
               type="text"
               name="genre"
               value={inputGame.genre}
               onChange={handleChange}
               required
            />
            <label>Platform</label>
            <input
               type="text"
               name="platform"
               value={inputGame.platform}
               onChange={handleChange}
               required
            />
            <label>Release</label>
            <input
               type="number"
               name="release"
               min={2000}
               max={2021}
               value={inputGame.release}
               onChange={handleChange}
               required
            />
            <label>Image Url</label>
            <input
               type="url"
               name="image_url"
               value={inputGame.image_url}
               onChange={handleChange}
               required
            />
            <div className="checkbox">
               <label>Single Player</label>
               <input
                  type="checkbox"
                  name="singlePlayer"
                  checked={inputGame.singlePlayer}
                  onChange={handleChange}
               />
               <label>Multi Player</label>
               <input
                  type="checkbox"
                  name="multiplayer"
                  checked={inputGame.multiplayer}
                  onChange={handleChange}
               />
            </div>
            <div className="form-button">
               <button type="submit" className="button-submit">
                  Submit
               </button>
               <Link to={"/game-list"}>
                  <button type="submit" className="button-cancel">
                     Cancel
                  </button>
               </Link>
            </div>
         </form>
      </div>
   );
};
export default GameForm;
