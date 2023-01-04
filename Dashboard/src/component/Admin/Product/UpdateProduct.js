import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../../actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../../layout/MetaData";
import SideBar from "../Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../../constants/productConstants";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const Navigate = useNavigate();

  const { error, product } = useSelector((state) => state.productDetails);
  console.log(product);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [salt, setSalt] = useState("");
  const [expired, setExpired] = useState("");
  const [tabletPerStrip, setTabletPerStrip] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState(0);
  const [gst, setGst] = useState("");
  const [batchCode, setBatchCode] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { categories } = useSelector((state) => state.categories);

 

  const productId = id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setSalt(product.salt);
      setExpired(product.expired);
      setTabletPerStrip(product.tabletPerStrip);
      setCompany(product.company);
      setCategory(product.category);
      setDiscount(product.discount);
      setStock(product.stock);
      setGst(product.gst);
      setBatchCode(product.batchCode);
      setHsnCode(product.hsnCode);
      setOldImages(product.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      Navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    Navigate,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("price", price);
    myForm.set("salt", salt);
    myForm.set("tabletPerStrip", tabletPerStrip);
    myForm.set("expired", expired);
    myForm.set("company", company);
    myForm.set("category", category);
    myForm.set("stock", stock);
    myForm.set("gst", gst);
    myForm.set("batchCode", batchCode);
    myForm.set("hsnCode", hsnCode);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className=" newProductContainer">
          <div className="addproductrow">
            <form
              className="content_addproduct"
              encType="multipart/form-data"
              onSubmit={updateProductSubmitHandler}
            >
              <div className="product_row">
                <h1>Updated Product</h1>
              </div>
              <div className="product_row">
                <div className="inputdiv">
                  <input
                    type="text"
                    className="productadd"
                    placeholder="Product Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="text"
                    className="productadd"
                    placeholder="Product Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    cols="30"
                    rows="1"
                  />
                  <input
                    type="number"
                    className="productadd"
                    placeholder=" Price"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <input
                    type="text"
                    className="productadd"
                    placeholder="Salt"
                    value={salt}
                    required
                    onChange={(e) => setSalt(e.target.value)}
                  />
                  <select
                    className="productadd"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value={category}>Choose Category</option>
                    {categories &&
                      categories.map((cate) => (
                        <option key={cate.categoryName} value={cate._id}>
                          {cate.categoryName}
                        </option>
                      ))}
                  </select>
                  <input
                    className="productadd"
                    type="date"
                    placeholder="expired"
                    value={expired}
                    required
                    onChange={(e) => setExpired(e.target.value)}
                  />
                  <input
                    className="productadd"
                    type="number"
                    placeholder="tabletPerStrip"
                    value={tabletPerStrip}
                    required
                    onChange={(e) => setTabletPerStrip(e.target.value)}
                  />
                </div>
                <div className="inputdiv">
                  <input
                    type="text"
                    className="productadd"
                    placeholder="company"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                  <input
                    type="number"
                    className="productadd"
                    placeholder="stock"
                    required
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                  <input
                    type="number"
                    className="productadd"
                    placeholder="discount"
                    required
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                  <input
                    type="text"
                    className="productadd"
                    placeholder="gst"
                    value={gst}
                    required
                    onChange={(e) => setGst(e.target.value)}
                  />
                  <input
                    type="text"
                    className="productadd"
                    placeholder="batchCode"
                    required
                    value={batchCode}
                    onChange={(e) => setBatchCode(e.target.value)}
                  />

                  <input
                    type="text"
                    className="productadd"
                    placeholder=" hsnCode"
                    required
                    value={hsnCode}
                    onChange={(e) => setHsnCode(e.target.value)}
                  />
                  <input
                    type="file"
                    className="addImage"
                    placeholder=" Product Image Upload"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProductImagesChange}
                    multiple
                  />
                </div>
              </div>
              <div id="createProductFormImage">
                {oldImages &&
                  oldImages.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt="Old Product Preview"
                    />
                  ))}
              </div>
              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
              </div>
              <div className="button_row">
                <button
                  id="createProductBtn"
                  type="submit"
                  disabled={loading ? true : false}
                >
                  Updated Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
