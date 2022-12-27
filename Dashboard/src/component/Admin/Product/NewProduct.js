/* eslint-disable array-callback-return */
import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct,getAdminCategory } from "../../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
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
  const [salt, setSalt] = useState("");
  const [expired, setExpired] = useState("");
  const [tabletPerStrip, setTabletPerStrip] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [discount,setDiscount] = useState("")
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


  const {categories } = useSelector((state) => state.categories);




  useEffect(() => {
    dispatch(getAdminCategory()) 
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
    myForm.set("salt", salt);
    myForm.set("expired", expired);
    myForm.set("tabletPerStrip", tabletPerStrip);
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
         {loading ? <Loader /> :  <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
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
              />
            </div>

            <div>
              <AttachMoneyIcon />
              <input
                type="text"
                placeholder="Salt"
                required
                onChange={(e) => setSalt(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="date"
                placeholder="expired"
                required
                onChange={(e) => setExpired(e.target.value)}
              />
            </div>
          
            <div>
              <AttachMoneyIcon />
              <input
                type="Number"
                placeholder="tabletPerStrip"
                required
                onChange={(e) => setTabletPerStrip(e.target.value)}
              />
            </div>

            <div>
              <AttachMoneyIcon />
              <input
                type="text"
                placeholder="company"
                required
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories && categories.map((cate) => (
                  <option key={cate.categoryName} value={cate._id}>
                    {cate.categoryName}
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
              />
            </div>
            
            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="discount"
                required
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            <div>
              <StorageIcon />
              <input
                type="text"
                placeholder="gst"
                required
                onChange={(e) => setGst(e.target.value)}
              />
            </div>
            <div>
              <StorageIcon />
              <input
                type="text"
                placeholder="batchCode"
                required
                onChange={(e) => setBatchCode(e.target.value)}
              />
            </div>
           
            <div>
              <StorageIcon />
              <input
                type="text"
                placeholder=" hsnCode"
                required
                onChange={(e) => setHsnCode(e.target.value)}
              />
            </div>

            

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
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
          </form>}
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
