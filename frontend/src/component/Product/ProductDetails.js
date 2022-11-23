import React from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);
// console.log(product)///
  return (
    <>
      <div className="ProductDetails">
        <div>
          <Carousel>{console.log(product.images)}
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="CarouselImage"
                  key={item.url}
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
