import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import hero from "../assets/img/register.png";
import {
   ArrowLeftOutlined,
   EyeOutlined,
   EyeInvisibleOutlined,
} from "@ant-design/icons";

const Register = () => {
   let history = useHistory();
   const [input, setInput] = useState({
      name: "",
      email: "",
      password: "",
   });

   const handleChange = (e) => {
      const target = e.target.value;
      const name = e.target.name;
      setInput({ ...input, [name]: target });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      axios
         .post(`https://backendexample.sanbersy.com/api/register`, {
            name: input.name,
            email: input.email,
            password: input.password,
         })
         .then(() => {
            history.push(`/login`);
         });
   };

   const [changePassword, setChangePassword] = useState(true);
   const changeIcon = changePassword === true ? false : true;

   return (
      <div className="wrapper-login">
         <div className="img-register">
            <img src={hero} alt="register" style={{ width: "80%" }} />
         </div>
         <div className="wrapper-form">
            <Link to={`/`}>
               <ArrowLeftOutlined className="arrow-icon" /> Go to App
            </Link>
            <h2>Register</h2>
            <form method="post" onSubmit={handleSubmit} className="form-auth">
               <label>Name</label>
               <div className="form-group">
                  <input
                     type="text"
                     name="name"
                     value={input.name}
                     onChange={handleChange}
                     required
                  />
               </div>
               <label>Email</label>
               <div className="form-group">
                  <input
                     type="email"
                     name="email"
                     value={input.email}
                     onChange={handleChange}
                     required
                  />
               </div>
               <label>Password</label>
               <div className="form-group">
                  <input
                     type="password"
                     name="password"
                     value={input.password}
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
               <button type="submit" className="submit-login">
                  Create account
               </button>
            </form>
            <p className="login">
               Already have an account ?<Link to={"/login"}> Login now</Link>
            </p>
         </div>
      </div>
   );
};
export default Register;
