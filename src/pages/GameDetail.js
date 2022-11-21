import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { DataContext } from "../context/Context";

const GameDetail = () => {
   let { slug } = useParams();
   const { inputGame, setInputGame, functions } = useContext(DataContext);
   const { functionDetailGame } = functions;
   const [currentId, setCurrentId] = useState(null);

   useEffect(() => {
      if (slug !== undefined) {
         functionDetailGame(slug);
      }
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

   return (
      <div className="game-detail">
         <div className="image">
            <img
               src={inputGame.image_url}
               alt={inputGame.name}
               style={{ width: "100%" }}
            />
         </div>
         <div className="description">
            <h1>{inputGame.name}</h1>
            <span>
               <strong>Genre</strong> : {inputGame.genre}
            </span>
            <span>
               <strong>Platform</strong> : {inputGame.platform}
            </span>
            <span>
               <strong>Release</strong> : {inputGame.release}
            </span>
            <span>
               <strong>Single Player</strong> :{" "}
               {inputGame.singlePlayer === 1 ? "Yes" : "No"}
            </span>
            <span>
               <strong>Multi Player</strong> :{" "}
               {inputGame.multiplayer === 1 ? "Yes" : "No"}
            </span>
            <Link to={"/games"} style={{ fontSize: ".95rem" }}>
               <ArrowLeftOutlined /> Back to game list
            </Link>
         </div>
      </div>
   );
};

export default GameDetail;
