/* eslint-disable array-callback-return */
import React, { Fragment, useEffect, useState } from "react";
import "../Product/newProduct.css";

import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  createPackage,
  getAdminLabCategory,
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
import { NEW_PACKAGE_RESET } from "../../../constants/testConstants";
import { useNavigate } from "react-router-dom";

const NewPackage = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newPackage);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [verify, setVerify] = useState("");
  const [tests, setTests] = useState("");
  const [numOfTest, setNumOfTest] = useState(0);
  const [testTiming, setTestTiming] = useState("");
  const [category, setCategory] = useState("");
  const [sample, setSample] = useState("");
  const [report, setReport] = useState("");
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

  useEffect(() => {
    dispatch(getAdminLabCategory());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Package Created Successfully");
      Navigate("/admin/packages");
      dispatch({ type: NEW_PACKAGE_RESET });
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
    myForm.set("verify", verify);
    myForm.set("tests", tests);
    myForm.set("numOfTest", numOfTest);
    myForm.set("testTiming", testTiming);
    myForm.set("category", category);
    myForm.set("sample", sample);
    myForm.set("report", report);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createPackage(myForm));
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
      <MetaData title="Create Package" />
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
              <h1>Create Package</h1>

              <div>
                <SpellcheckIcon />
                <input
                  type="text"
                  placeholder="Package Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <DescriptionIcon />

                <textarea
                  placeholder="Package Description"
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
                  placeholder="Verify"
                  required
                  onChange={(e) => setVerify(e.target.value)}
                />
              </div>
              <div>
                <AttachMoneyIcon />
                <input
                  type="text"
                  placeholder="tests"
                  required
                  onChange={(e) => setTests(e.target.value)}
                />
              </div>

              <div>
                <AttachMoneyIcon />
                <input
                  type="Number"
                  placeholder="numOfTest"
                  required
                  onChange={(e) => setNumOfTest(e.target.value)}
                />
              </div>

              <div>
                <AttachMoneyIcon />
                <input
                  type="text"
                  placeholder="testTiming"
                  required
                  onChange={(e) => setTestTiming(e.target.value)}
                />
              </div>

              <div>
                <AccountTreeIcon />
                <select onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Choose Lab Category</option>
                  {labCategories &&
                    labCategories.map((cate) => (
                      <option key={cate.categoryName} value={cate._id}>
                        {cate.categoryName}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <StorageIcon />
                <input
                  type="text"
                  placeholder="sample"
                  required
                  onChange={(e) => setSample(e.target.value)}
                />
              </div>
              <div>
                <StorageIcon />
                <input
                  type="text"
                  placeholder="report"
                  required
                  onChange={(e) => setReport(e.target.value)}
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
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default NewPackage;
