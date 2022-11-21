import React from "react";
import hero from "../assets/img/hero.png";
import { Link } from "react-router-dom";
import {
   ArrowLeftOutlined,
   EyeOutlined,
   EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import { DataContext } from "../context/Context";
import { useState } from "react";

const Login = () => {
   const { inputLogin, setInputLogin, functions } = useContext(DataContext);

   const { functionLogin } = functions;

   const handleChange = (event) => {
      let value = event.target.value;
      let name = event.target.name;

      setInputLogin({ ...inputLogin, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      functionLogin();
   };

   const [changePassword, setChangePassword] = useState(true);
   const changeIcon = changePassword === true ? false : true;

   return (
      <div className="wrapper-login">
         <div className="img-login">
            <img src={hero} alt="login" style={{ width: "100%" }} />
         </div>
         <div className="wrapper-form">
            <Link to={`/`} className="wrapper-icon">
               <ArrowLeftOutlined className="arrow-icon" /> Go to App
            </Link>
            <h2>Welcome Back!</h2>
            <form method="post" onSubmit={handleSubmit} className="form-auth">
               <label>Email</label>
               <div className="form-group">
                  <input
                     type="email"
                     name="email"
                     value={inputLogin.email}
                     onChange={handleChange}
                     required
                  />
               </div>
               <label>Password</label>
               <div className="form-group">
                  <input
                     type={changePassword ? "password" : "text"}
                     name="password"
                     value={inputLogin.password}
                     onChange={handleChange}
                     required
                  />
                  <span
                     className="icon"
                     onClick={() => {
                        setChangePassword(changeIcon);
                     }}
                  >
                     {changeIcon ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </span>
               </div>
               <button type="submit" className="submit-login">Login</button>
            </form>
            <p className="register">
               Don't have an account yet ?
               <Link to={"/register"}> Create an Account</Link>{" "}
            </p>
         </div>
      </div>
   );
};

export default Login;
