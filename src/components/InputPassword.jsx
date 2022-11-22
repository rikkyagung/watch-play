import React, { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

export default function ShowHidePassword(props) {
   const [isVisible, setVisible] = useState(false);

   const toggle = () => {
      setVisible(!isVisible);
   };

   return (
      <div className="form-group">
         <input type={!isVisible ? "password" : "text"} {...props} required />
         <span className="icon" onClick={toggle}>
            {isVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
         </span>
      </div>
   );
}
