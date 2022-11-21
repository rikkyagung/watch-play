import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { DataContext } from "../context/Context";

const MovieDetail = () => {
   let { slug } = useParams();
   const { inputMovie, setInputMovie, functions } = useContext(DataContext);
   const { functionDetailMovie } = functions;
   const [currentId, setCurrentId] = useState(null);

   useEffect(() => {
      if (slug !== undefined) {
         functionDetailMovie(slug);
      }
      setInputMovie({
         title: "",
         genre: "",
         duration: "",
         rating: 0,
         image_url: "",
         description: "",
         review: "",
         year: 0,
      });
      setCurrentId(null);
   }, [slug]);

   const convertion = (param) => {
      let time = Math.floor(param * 60);
      let hours = Math.floor(time / 3600);
      let minutes = Math.floor((time % 3600) / 60);
      let seconds = Math.floor((time % 3600) % 60);
      return `${hours} Jam ${minutes} Menit ${seconds} Detik`;
   };

   return (
      <div className="game-detail">
         <div className="image">
            <img src={inputMovie.image_url} alt={inputMovie.title} />
         </div>
         <div className="description">
            <h1>{inputMovie.title}</h1>
            <span>
               <strong>Genre </strong>: {inputMovie.genre}
            </span>
            <span>
               <strong>Year </strong> : {inputMovie.year}
            </span>
            <span>
               <strong>Rating </strong> : {inputMovie.rating} of 10
            </span>
            <span>
               <strong>Duration</strong> : {convertion(inputMovie.duration)}
            </span>
            <span>
               <strong>Description</strong> : {inputMovie.description}
            </span>
            <span>
               <strong>Review</strong> : {inputMovie.review}
            </span>
            <Link to={"/movies"} style={{ fontSize: ".95rem" }}>
               <ArrowLeftOutlined /> Back to movie list
            </Link>
         </div>
      </div>
   );
};

export default MovieDetail;
