import React from "react";
import { Route, Routes } from "react-router-dom";
import { DataProvider } from "../context/Context";
// import Games from "../pages/Games";
import Home from "../pages/Home";

export default function Path() {
   return (
      <DataProvider>
         <Routes>
            <Route path="/" element={<Home />} />
         </Routes>
      </DataProvider>
   );
}
