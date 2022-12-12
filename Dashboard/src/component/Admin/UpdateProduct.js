import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const Navigate = useNavigate();

  const { error, product } = useSelector((state) => state.productDetails);
console.log(product)
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
  const [stock, setStock] = useState(0);
  const [gst, setGst] = useState("");
  const [batchCode, setBatchCode] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Ayurveda",
    "Vitamins & supplements",
    "Healthcare devices",
    "Pain Relief",
    "Diabetes Care",
    "Skin Care"
  ];

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
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
       

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="text"
                placeholder="Salt"
                required
                value={price}
                onChange={(e) => setSalt(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="date"
                placeholder="expired"
                required
                value={expired}
                onChange={(e) => setExpired(e.target.value)}
              />
            </div>
          
            <div>
              <AttachMoneyIcon />
              <input
                type="Number"
                placeholder="tabletPerStrip"
                required
                value={tabletPerStrip}
                onChange={(e) => setTabletPerStrip(e.target.value)}
              />
            </div>

            <div>
              <AttachMoneyIcon />
              <input
                type="text"
                placeholder="company"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>


            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={stock}
              />
            </div>
            <div>
              <StorageIcon />
              <input
                type="text"
                placeholder="gst"
                required
                value={gst}
                onChange={(e) => setGst(e.target.value)}
              />
            </div>
            <div>
              <StorageIcon />
              <input
                type="text"
                placeholder="batchCode"
                value={batchCode}
                required
                onChange={(e) => setBatchCode(e.target.value)}
              />
            </div>
           
            <div>
              <StorageIcon />
              <input
                type="text"
                placeholder=" hsnCode"
                value={hsnCode}
                required
                onChange={(e) => setHsnCode(e.target.value)}
              />
            </div>


            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
