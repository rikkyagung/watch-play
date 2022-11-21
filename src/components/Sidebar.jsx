import React from "react";
import { Layout, Menu } from "antd";
import {
   DashboardOutlined,
   VideoCameraOutlined,
   PlayCircleOutlined,
   SettingOutlined,
   DatabaseOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
   const { Sider } = Layout;
   const { SubMenu } = Menu;

   return (
      <Sider width={200} className="site-layout-background">
         <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
            <Menu.Item key="1" icon={<DashboardOutlined />}>
               <Link to={"/dashboard"}>Dashboard</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<DatabaseOutlined />} title="Manage Data">
               <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                  <Link to={"/movie-list"}>Movie</Link>
               </Menu.Item>
               <Menu.Item key="3" icon={<PlayCircleOutlined />}>
                  <Link to={"/game-list"}>Game</Link>
               </Menu.Item>
            </SubMenu>
            <Menu.Item key="4" icon={<SettingOutlined />}>
               <Link to={"/change-password"}>Change Password</Link>
            </Menu.Item>
         </Menu>
      </Sider>
   );
}
