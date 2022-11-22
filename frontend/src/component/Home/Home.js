import React from "react";
import "./Home.css";
import { CgMouse } from "react-icons/cg";
import ProductCart from "./ProductCart";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import {useAlert} from "react-alert"

const Home = () => {
  const alert = useAlert()
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector((state) =>
    state.products
  );
 
  useEffect(() => {
    if(error){
      return alert.error(error)
    }
    dispatch(getProduct());
  }, [ alert,dispatch, error]);

  return ( <>
{loading ? (<Loader />):(<>
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
        {products && products.map((product) => <ProductCart product={product} key ={product._id}/>)}
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
    )}  </>

    
  );
};

export default Home;
