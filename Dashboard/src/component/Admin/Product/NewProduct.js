/* eslint-disable array-callback-return */
import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  createProduct,
  getAdminCategory,
} from "../../../actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../../layout/MetaData";
import SideBar from "../Sidebar";
import Loader from "../../layout/Loader/Loader";
import { NEW_PRODUCT_RESET } from "../../../constants/productConstants";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");

  const [salt, setSalt] = useState("");
  const [expired, setExpired] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState(0);
  const [gst, setGst] = useState("");
  const [batchCode, setBatchCode] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  // const categories = [
  //   "Ayurveda",
  //   "Vitamins & supplements",
  //   "Healthcare devices",
  //   "Pain Relief",
  //   "Diabetes Care",
  //   "Skin Care"
  // ];

  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getAdminCategory());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      Navigate("/admin/products");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, Navigate, success]);

  // const data = categories &&  categories.map((category)=> console.log(category.categoryName))

  // console.log(Object.values(categories))
  // console.log(categories)
  // console.log(data)
  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("price", price);
    myForm.set("type", type);
    myForm.set("salt", salt);
    myForm.set("expired", expired);
    myForm.set("productQuantity", productQuantity);
    myForm.set("company", company);
    myForm.set("category", category);
    myForm.set("discount", discount);
    myForm.set("stock", stock);
    myForm.set("gst", gst);
    myForm.set("batchCode", batchCode);
    myForm.set("hsnCode", hsnCode);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div className="addproductrow">
              <form
                className="content_addproduct"
                encType="multipart/form-data"
                onSubmit={createProductSubmitHandler}
              >
                <div className="product_row">
                  <h1>Add Product</h1>
                </div>
                <div className="product_row field">
                  <div className="inputdiv">
                    <input
                      type="text"
                      className="productadd"
                      placeholder="Product Name"
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="text"
                      className="productadd"
                      placeholder="Product Description"
                      onChange={(e) => setDescription(e.target.value)}
                      cols="30"
                      rows="1"
                    />
                    <input
                      type="number"
                      className="productadd"
                      placeholder=" Price"
                      required
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <input
                      type="number"
                      className="productadd"
                      placeholder="Type"
                      required
                      onChange={(e) => setType(e.target.value)}
                    />
                    <input
                      type="text"
                      className="productadd"
                      placeholder="Salt"
                      required
                      onChange={(e) => setSalt(e.target.value)}
                    />
                    <select
                      className="productadd"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Choose Category</option>
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
                      required
                      onChange={(e) => setExpired(e.target.value)}
                    />
                    <input
                      className="productadd"
                      type="number"
                      placeholder="Product Quantity"
                      required
                      onChange={(e) => setProductQuantity(e.target.value)}
                    />
                  </div>
                  <div className="inputdiv">
                    <input
                      type="text"
                      className="productadd"
                      placeholder="company"
                      required
                      onChange={(e) => setCompany(e.target.value)}
                    />
                    <input
                      type="number"
                      className="productadd"
                      placeholder="stock"
                      required
                      onChange={(e) => setStock(e.target.value)}
                    />
                    <input
                      type="number"
                      className="productadd"
                      placeholder="discount"
                      required
                      onChange={(e) => setDiscount(e.target.value)}
                    />
                    <input
                      type="text"
                      className="productadd"
                      placeholder="gst"
                      required
                      onChange={(e) => setGst(e.target.value)}
                    />
                    <input
                      type="text"
                      className="productadd"
                      placeholder="batchCode"
                      required
                      onChange={(e) => setBatchCode(e.target.value)}
                    />

                    <input
                      type="text"
                      className="productadd"
                      placeholder=" hsnCode"
                      required
                      onChange={(e) => setHsnCode(e.target.value)}
                    />
                    <input
                      type="file"
                      className="addImage"
                      placeholder=" Product Image Upload"
                      name="avatar"
                      accept="image/*"
                      onChange={createProductImagesChange}
                      multiple
                    />
                  </div>
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
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
