import React, { useState } from "react";
// import Loader from "../layout/Loader/Loader";
import "./Login.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../actions/userAction";

const Login = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  //   const { error, loading, isAuthenticated } = useSelector(
  //     (state) => state.user
  //   );

  const [loginContact, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginContact));
    Navigate("/admin/otp", {
      contact: loginContact,
    });
  };
  return (
    <>
      <form className="Form-group" onSubmit={loginSubmit}>
        <div className="logopng">
          <img src="/images/loginLogo.png" alt="logo" />
        </div>
        <h1>Login</h1>
        <input
          className="input"
          type="number"
          placeholder="Contact"
          required
          value={loginContact}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <input className="subBtn " type="submit" value="Login" />
        <span>
          Don’t have an account? <Link to="/admin/register">Signup here</Link>
        </span>
      </form>
    </>
  );
};

export default Login;
