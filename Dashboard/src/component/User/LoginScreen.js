import React from "react";
import CommanUI from "./CommonUI/CommanUI";
import Login from "./FormPart/Login";

const LoginScreen = () => {
  return (
    <>
      <CommanUI formpart={<Login />} />
    </>
  );
};

export default LoginScreen;
