import React, { useState,useEffect } from "react";
import "./Otp.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verify, clearErrors } from "../../../actions/userAction";
import { useAlert } from "react-alert";



const UserOtpScreen = ({ route }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const alert = useAlert();


    const { error, loading, isAuthenticated } = useSelector(
      (state) => state.user
    );
    console.log(`authenticate ${isAuthenticated}`)

  // const [otp, setOtp] = useState(0);
  // console.log(otp);
  // console.log(isAuthenticated, loading);

  const [otpData, setOtpData] = useState({
    otpInput1: "",
    otpInput2: "",
    otpInput3: "",
    otpInput4: "",
  });
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      Navigate("/admin/dashboard");
    }
  }, [
    dispatch,
    alert,
    error,
    isAuthenticated,
    Navigate,
    // redirect
  ]);

  let inputName, value;
  const loginInputHandler = (e) => {
    inputName = e.target.name;
    value = e.target.value;
    setOtpData({ ...otpData, [inputName]: value });
  };
  console.log(otpData);

  const str = otpData.otpInput1;
  const otp = str.concat(
    otpData.otpInput2,
    otpData.otpInput3,
    otpData.otpInput4
  );
  console.log(otp)
  const submitOtp = (e) => {
    e.preventDefault();

    dispatch(verify(Number(otp), 
    // route.params.contact
    ));
    // if (isAuthenticated) {
    //   Navigate("/admin/dashboard");
    // }
  };

  return (
    <>
      <div>
        <form className="Form-group" onSubmit={submitOtp}>
          <div className="logopng">
            <img src="/images/OtpLogo.png" alt="logo" />
          </div>
          <label className="otptext">
            <h1> OTP Verification</h1>
          </label>

          <p className="text2">Enter OTP code send to your number</p>
          <p className="text1"> Please Verify?</p>

          <div className="form-field" id="otp">
            <div className="input-field">
              <input
                className="otp-input"
                type="number"
                maxLength="1"
                name="otpInput1"
                size="1"
                value={otpData.otpInput1}
                onChange={loginInputHandler}
              />
              <input
                className="otp-input"
                type="number"
                maxLength="1"
                name="otpInput2"
                size="1"
                value={otpData.otpInput2}
                onChange={loginInputHandler}
              />
              <input
                className="otp-input"
                type="number"
                maxLength="1"
                name="otpInput3"
                size="1"
                value={otpData.otpInput3}
                onChange={loginInputHandler}
              />
              <input
                className="otp-input"
                type="number"
                maxLength="1"
                name="otpInput4"
                value={otpData.otpInput4}
                onChange={loginInputHandler}
              />
            </div>
          </div>
          <p className="text3">Don’t not receive OTP?</p>

          <p className="text4">Resend OTP?</p>

          <button className="VerifyBtn " type="submit">
            Verify
          </button>
        </form>
      </div>
    </>
  );
};

export default UserOtpScreen;
