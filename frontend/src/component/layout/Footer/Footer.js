import React from "react";
// import playStore from "../../../../public/Images/Appstore";
// import appStore from "../../../../public/Images/playstore";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="leftFooter">
          <h4>Download Our App</h4>
          <p>Download App For Android and IOS Phone</p>
          <img src="images/playstore.png" alt="playstore" />
          <img src="images/Appstore.png" alt="appstore" />
        </div>
        <div className="midFooter">
          <h1>BrandName</h1>
          <p>High Quality is our first priority</p>
          <p>Copyright 2022 &copy; DeepakSingh</p>
        </div>
        <div className="rightFooter">
          <h4>Follow Us</h4>
          <a href="https://instagram.com/">Instagram</a>
          <a href="https://facebook.com/">Facebook</a>
          <a href="https://linkedIn.com/">LinkedIn</a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
