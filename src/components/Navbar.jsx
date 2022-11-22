import React from "react";
import { Layout, Menu } from "antd";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

export default function Navbar() {
   let history = useHistory();
   const location = useLocation();
   const { Header } = Layout;

   return (
      <Header className="header">
         <Menu
            mode="horizontal"
            style={{ justifyContent: "flex-end", position: "relative" }}
         >
            <Menu.Item
               key="1"
               className="logo"
               style={{ position: "absolute", left: "-40px", top: "-40px" }}
            >
               <NavLink to={"/"}>
                  <img
                     src={require("../assets/img/WP-01.webp")}
                     width={150}
                     alt="logo"
                  />
               </NavLink>
            </Menu.Item>
            <Menu.Item key={"2"}>
               <NavLink
                  className={location.pathname === "/" ? "selected" : ""}
                  to={"/"}
               >
                  Home
               </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
               <NavLink activeClassName="selected" to={"/movies"}>
                  Movies
               </NavLink>
            </Menu.Item>
            <Menu.Item key="4">
               <NavLink activeClassName="selected" to={"/games"}>
                  Games
               </NavLink>
            </Menu.Item>
            {Cookies.get("token") === undefined && (
               <>
                  <Menu.Item key="5">
                     <NavLink to={"/register"}>Register</NavLink>
                  </Menu.Item>
                  <Menu.Item key="6">
                     <NavLink to={"/login"}>Login</NavLink>
                  </Menu.Item>
               </>
            )}
            {Cookies.get("token") !== undefined && (
               <Menu.Item
                  key="7"
                  onClick={() => {
                     Cookies.remove("token");
                     history.push("/login");
                  }}
               >
                  Logout
               </Menu.Item>
            )}
         </Menu>
      </Header>
   );
}
