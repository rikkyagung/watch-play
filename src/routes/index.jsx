import Cookies from "js-cookie";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { DataProvider } from "../context/Context";
import LayoutComponent from "../Layout/Layout";
import Games from "../pages/Games";
import Home from "../pages/Home";
import ChangedPassword from "../pages/ChangePassword";
import Dashboard from "../pages/Dashboard";
import Movies from "../pages/Movies";
import Register from "../pages/Register";
import MovieList from "../pages/MovieList";
import GameList from "../pages/GameList";
import GameForm from "../pages/GameForm";
import MovieForm from "../pages/MovieForm";
import GameDetail from "../pages/GameDetail";
import DetailMovie from "../pages/MovieDetail";
import Login from "../pages/Login";

export default function Path() {
   const RouteLogin = ({ ...props }) => {
      if (Cookies.get("token") !== undefined) {
         return <Redirect to={"/home"} />;
      } else if (Cookies.get("token") === undefined) {
         return <Route {...props} />;
      }
   };

   const RouteAuth = ({ ...props }) => {
      if (Cookies.get("token") === undefined) {
         return <Redirect to={"/home"} />;
      } else if (Cookies.get("token") !== undefined) {
         return <Route {...props} />;
      }
   };

   return (
      <DataProvider>
         <Switch>
            <Route exact path="/">
               <LayoutComponent>
                  <Home />
               </LayoutComponent>
            </Route>

            <Route exact path={"/movies"}>
               <LayoutComponent>
                  <Movies />
               </LayoutComponent>
            </Route>
            <Route exact path={"/movie-detail/:slug"}>
               <LayoutComponent>
                  <DetailMovie />
               </LayoutComponent>
            </Route>
            <RouteAuth exact path={"/movie-list"}>
               <LayoutComponent>
                  <MovieList />
               </LayoutComponent>
            </RouteAuth>
            <RouteAuth exact path={"/movie-list/create"}>
               <LayoutComponent>
                  <MovieForm />
               </LayoutComponent>
            </RouteAuth>
            <RouteAuth exact path={"/movie-list/edit/:slug"}>
               <LayoutComponent>
                  <MovieForm />
               </LayoutComponent>
            </RouteAuth>

            <Route exact path={"/games"}>
               <LayoutComponent>
                  <Games />
               </LayoutComponent>
            </Route>
            <RouteAuth exact path={"/game-list"}>
               <LayoutComponent>
                  <GameList />
               </LayoutComponent>
            </RouteAuth>
            <RouteAuth exact path={"/game-list/create"}>
               <LayoutComponent>
                  <GameForm />
               </LayoutComponent>
            </RouteAuth>
            <RouteAuth exact path={"/game-list/edit/:slug"}>
               <LayoutComponent>
                  <GameForm />
               </LayoutComponent>
            </RouteAuth>
            <Route exact path={"/game-detail/:slug"}>
               <LayoutComponent>
                  <GameDetail />
               </LayoutComponent>
            </Route>

            <RouteLogin exact path={"/login"}>
               <Login />
            </RouteLogin>
            <RouteLogin exact path={"/register"}>
               <Register />
            </RouteLogin>

            <RouteAuth exact path={"/dashboard"}>
               <LayoutComponent>
                  <Dashboard />
               </LayoutComponent>
            </RouteAuth>

            <RouteAuth exact path={"/change-password"}>
               <LayoutComponent>
                  <ChangedPassword />
               </LayoutComponent>
            </RouteAuth>
         </Switch>
      </DataProvider>
   );
}
