import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";

export default function CardMovie({ props }) {
   return (
      <Card
         hoverable
         className="image-home"
         cover={
            <img className="img-card" src={props.image_url} alt={props.title} />
         }
      >
         <p className="rating">
            <StarFilled style={{ color: "#f7bd0f" }} /> {props.rating}/10
         </p>
         <div className="blur">
            <div className="description-card">
               <h1>{props.title}</h1>
               <p>
                  {props.genre
                     .split(" ")
                     .map((el) => {
                        return el[0].toUpperCase() + el.slice(1);
                     })
                     .join(" ")}
               </p>
               <Link to={`/movie-detail/${props.id}`}>
                  <button className="view-detail">View</button>
               </Link>
            </div>
         </div>
      </Card>
   );
}
