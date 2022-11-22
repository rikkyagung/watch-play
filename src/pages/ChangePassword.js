import React from "react";
import { useContext } from "react";
import { DataContext } from "../context/Context";
import ShowHidePassword from "../components/InputPassword";

const ChangedPassword = () => {
   const { inputChangePassword, setInputChangePassword, functions } =
      useContext(DataContext);

   const { functionChangePassword } = functions;

   const handleChange = (e) => {
      const target = e.target.value;
      const name = e.target.name;
      setInputChangePassword({ ...inputChangePassword, [name]: target });
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      functionChangePassword();
   };

   return (
      <form className="change-password" method="post" onSubmit={handleSubmit}>
         <label>Current Password</label>
         <ShowHidePassword name="current_password" onChange={handleChange} />
         <label>New Password</label>
         <ShowHidePassword name="new_password" onChange={handleChange} />
         <label>Confirm New Password</label>
         <ShowHidePassword name="new_confirm_password" onChange={handleChange} />
         <button type="submit">Confirm</button>
      </form>
   );
};
export default ChangedPassword;
