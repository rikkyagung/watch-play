import React from "react";
import { SearchOutlined } from "@ant-design/icons";

export default function InputSearch(props) {
   return (
      <form onSubmit={props.onSubmit} className="form-search">
         <input
            onChange={props.onChange}
            type="text"
            value={props.value}
            name="search"
            className="search-input"
            placeholder="I want to see..."
         />
         {/* <input type="submit" value={"Search"} className="submit-search" /> */}
         <button type="submit" className="submit-search">
            <SearchOutlined />
         </button>
      </form>
   );
}
