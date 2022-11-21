import React from "react";
import { Route, Switch } from "react-router-dom";
import { DataProvider } from "../context/Context";
import LayoutComponent from "../Layout/Layout";
// import Games from "../pages/Games";
import Home from "../pages/Home";

export default function Path() {
   return (
      <DataProvider>
         <Switch>
            <Route exact path="/">
               <LayoutComponent>
                  <Home />
               </LayoutComponent>
            </Route>
         </Switch>
      </DataProvider>
   );
}
