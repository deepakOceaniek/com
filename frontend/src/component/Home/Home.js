import React from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector((state) =>
    console.log(state.products)
  );

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  // const product = {
  //   name: "Blue Tshirt",
  //   image: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
  //   price: "₹3000",
  //   _id: "deepak",
  // };
  // console.log(loading);
  // console.log(error);
  // console.log(products);
  // console.log(productsCount);
  return (
    <>
      <MetaData title="MediPros" />
      <div className="banner">
        <p>Welcome To The MediPros </p>
        <h1>Find Amazing And Qualtity Product Below</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Product</h2>
      <div className="container" id="container">
        {products && products.map((product) => <Product product={product} />)}
        {/* <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} /> */}
      </div>
    </>
  );
};

export default Home;
