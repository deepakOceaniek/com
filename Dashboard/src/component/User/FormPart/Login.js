import React, { useState,useEffect } from "react";
// import Loader from "../layout/Loader/Loader";
import "./Login.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login,clearErrors } from "../../../actions/userAction";
import { useAlert } from "react-alert";


const Login = ({setContactData}) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const alert = useAlert();


    const { error, loading, isAuthenticated } = useSelector(
      (state) => state.user
    );

  const [loginContact, setLoginPassword] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    // if (isAuthenticated ===true) {
    //   Navigate("/admin/dashboard");
    // }
  }, [dispatch, alert, error, isAuthenticated, Navigate, 
    // redirect
  ]);

  const loginSubmit = (e) => {
    e.preventDefault();
    setContactData(loginContact)
    dispatch(login(loginContact));
    Navigate("/otp");
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
