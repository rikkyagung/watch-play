import React from "react";
import { useContext } from "react";
import { DataContext } from "../context/Context";

export default function FilterMovie({ onSubmit, onChange, props }) {
   const { setFetchStatus } = useContext(DataContext);

   return (
      <div className="home-content" style={{ paddingBottom: "2rem" }}>
         <div className="filter-movie">
            <div className="form-filter">
               <form onSubmit={onSubmit} className="form-filter">
                  <div className="filter__input__wrapper">
                     <label>Rating</label>
                     <input
                        onChange={onChange}
                        type="number"
                        min={0}
                        className="filter__input"
                        value={props.rating}
                        name="rating"
                     />
                  </div>
                  <div className="filter__input__wrapper">
                     <label>Year</label>
                     <input
                        onChange={onChange}
                        type="number"
                        min={0}
                        className="filter__input"
                        value={props.year}
                        name="year"
                     />
                  </div>
                  <div className="filter__input__wrapper">
                     <label>Duration</label>
                     <input
                        onChange={onChange}
                        type="number"
                        min={0}
                        className="filter__input"
                        value={props.duration}
                        name="duration"
                     />
                  </div>
                  <div className="filter__wrapper__button">
                     <input
                        className="submit-filter"
                        type="submit"
                        value={"Filter"}
                     />
                  </div>
               </form>
               <button
                  onClick={() => {
                     setFetchStatus(true);
                  }}
                  className="submit-filter"
               >
                  Reset
               </button>
            </div>
         </div>
      </div>
   );
}
