import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../context/Context";

const MovieForm = () => {
   const {
      inputMovie,
      setInputMovie,
      currentId,
      setCurrentId,
      functions,
   } = useContext(DataContext);

   const { fetchDataEditMovie, functionSubmitMovie, functionEditMovie } =
      functions;

   let { slug } = useParams();

   useEffect(() => {
      if (slug !== undefined) {
         fetchDataEditMovie(slug);
      }
      setInputMovie({
         title: "",
         genre: "",
         year: 0,
         rating: 0,
         duration: "",
         image_url: "",
         description: "",
         review: "",
      });
      setCurrentId(null);
   }, [slug]);

   const handleChange = (e) => {
      const target = e.target.value;
      const name = e.target.name;
      setInputMovie({ ...inputMovie, [name]: target });
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      if (currentId === null) {
         functionSubmitMovie();
      } else {
         functionEditMovie(currentId);
      }
   };

   return (
      <div className="wrapper-form">
         <form method="post" onSubmit={handleSubmit} className="form-movie">
            <label>Title</label>
            <input
               type="text"
               name="title"
               value={inputMovie.title}
               onChange={handleChange}
               required
            />
            <label>Genre</label>
            <input
               type="text"
               name="genre"
               value={inputMovie.genre}
               onChange={handleChange}
               required
            />
            <label>Year</label>
            <input
               type="number"
               name="year"
               value={inputMovie.year}
               onChange={handleChange}
               required
            />
            <label>Rating</label>
            <input
               type="number"
               name="rating"
               value={inputMovie.rating}
               onChange={handleChange}
               required
            />
            <label>Duration</label>
            <input
               type="text"
               name="duration"
               value={inputMovie.duration}
               onChange={handleChange}
               required
            />
            <label>Image Url</label>
            <input
               type="url"
               name="image_url"
               value={inputMovie.image_url}
               onChange={handleChange}
               required
            />
            <label>Description</label>
            <textarea
               type="text"
               name="description"
               value={inputMovie.description}
               onChange={handleChange}
               required
               rows={5}
            />
            <label>Review</label>
            <input
               type="text"
               name="review"
               value={inputMovie.review}
               onChange={handleChange}
               required
            />
            <div className="form-button">
               <button type="submit" className="button-submit">
                  Submit
               </button>
               <Link to={"/movie-list"}>
                  <button type="submit" className="button-cancel">
                     Cancel
                  </button>
               </Link>
            </div>
         </form>
      </div>
   );
};

export default MovieForm;
