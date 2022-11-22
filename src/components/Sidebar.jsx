import React from "react";
import { Layout, Menu } from "antd";
import {
   DashboardOutlined,
   VideoCameraOutlined,
   PlayCircleOutlined,
   SettingOutlined,
   DatabaseOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
   const { Sider } = Layout;
   const { SubMenu } = Menu;

   return (
      <Sider width={200} className="site-layout-background">
         <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
            <Menu.Item key="1" icon={<DashboardOutlined />}>
               <NavLink activeClassName="sideSelected" to={"/dashboard"}>
                  Dashboard
               </NavLink>
            </Menu.Item>
            <SubMenu key="sub1" icon={<DatabaseOutlined />} title="Manage Data">
               <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                  <NavLink activeClassName="sideSelected" to={"/movie-list"}>
                     Movie
                  </NavLink>
               </Menu.Item>
               <Menu.Item key="3" icon={<PlayCircleOutlined />}>
                  <NavLink activeClassName="sideSelected" to={"/game-list"}>
                     Game
                  </NavLink>
               </Menu.Item>
            </SubMenu>
            <Menu.Item key="4" icon={<SettingOutlined />}>
               <NavLink activeClassName="sideSelected" to={"/change-password"}>
                  Change Password
               </NavLink>
            </Menu.Item>
         </Menu>
      </Sider>
   );
}
