/* eslint-disable array-callback-return */
import React, { Fragment, useEffect, useState } from "react";
import "../Product/newProduct.css";

import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  createTest,
  getAdminLabCategory,
  getAdminPackage,
  getAdminSample,
} from "../../../actions/testAction";
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
import { NEW_TEST_RESET } from "../../../constants/testConstants";
import { useNavigate } from "react-router-dom";

const NewTest = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newTest);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [sample, setSample] = useState("");
  const [category, setCategory] = useState("");
  const [packageTest, setPackageTest] = useState("");

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

  const { labCategories } = useSelector((state) => state.labCategories);
  const { packages } = useSelector((state) => state.packages);
  const { samples } = useSelector((state) => state.samples);

  console.log(packages);
  console.log(labCategories);
  console.log(samples);
  useEffect(() => {
    dispatch(getAdminLabCategory());
    dispatch(getAdminPackage());
    dispatch(getAdminSample());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Test Created Successfully");
      Navigate("/admin/test");
      dispatch({ type: NEW_TEST_RESET });
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
    myForm.set("sample", sample);
    myForm.set("packageTest", packageTest);
    myForm.set("category", category);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createTest(myForm));
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
      <MetaData title="Create Test" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={createProductSubmitHandler}
            >
              <h1>Create Test</h1>

              <div>
                <SpellcheckIcon />
                <input
                  type="text"
                  placeholder="Test Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <DescriptionIcon />

                <textarea
                  placeholder="Test Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="1"
                ></textarea>
              </div>
              <div>
                <AccountTreeIcon />
                <select onChange={(e) => setSample(e.target.value)}>
                  <option value="">Choose Sample</option>
                  {samples &&
                    samples.map((sam) => (
                      <option key={sam.name} value={sam._id}>
                        {sam.name}
                      </option>
                    ))}
                </select>
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
                <AccountTreeIcon />
                <select onChange={(e) => setPackageTest(e.target.value)}>
                  <option value="">Choose Package</option>
                  {packages &&
                    packages.map((pack) => (
                      <option key={pack.name} value={pack._id}>
                        {pack.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <AccountTreeIcon />
                <select onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Choose Category</option>
                  {labCategories &&
                    labCategories.map((cate) => (
                      <option key={cate.categoryName} value={cate._id}>
                        {cate.categoryName}
                      </option>
                    ))}
                </select>
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
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default NewTest;
