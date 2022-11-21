import React from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="banner">
        <p>Welcome To The MediPros </p>
        <h1>Find Amazing And Qualtity Product Below</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
    </>
  );
};

export default Home;
