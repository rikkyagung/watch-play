import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function CardGame({ props }) {
   return (
      <Card
         hoverable
         className="image-home"
         cover={
            <img className="img-card" src={props.image_url} alt={props.name} />
         }
      >
         <div className="blur">
            <div className="description-card">
               <h1>{props.name}</h1>
               <p>{props.platform}</p>
               <Link to={`/game-detail/${props.id}`}>
                  <button className="view-detail">View</button>
               </Link>
            </div>
         </div>
      </Card>
   );
}
