import React from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="banner">
        <p>Welcome to the shop</p>
        <h1>Find Amazing Product below</h1>

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
