import React from "react";
import CommanUI from "./CommonUI/CommanUI";
import Otp from "./FormPart/Otp";
const OtpScreen = () => {
  return (
    <>
      <CommanUI formpart={<Otp />} />
    </>
  );
};

export default OtpScreen;
