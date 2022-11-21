import { Layout } from "antd";
import Cookies from "js-cookie";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function LayoutComponent(props) {
   const { Content } = Layout;

   return (
      <Layout>
         <Navbar />
         <Layout>
            {Cookies.get("token") !== undefined && <Sidebar />}
            <Layout style={{ padding: "1rem" }}>
               <Content
                  className="site-layout-background"
                  style={{
                     margin: 0,
                  }}
               >
                  {props.children}
               </Content>
            </Layout>
         </Layout>
         <Footer />
      </Layout>
   );
}
