import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updatePackage,
  getPackageDetails,
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
import { UPDATE_PACKAGE_RESET } from "../../../constants/testConstants";
import { useParams, useNavigate } from "react-router-dom";

const UpdatePackage = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const Navigate = useNavigate();

  const { error, testPackage } = useSelector((state) => state.packageDetails);
  console.log(testPackage);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const [verify, setVerify] = useState("");
  const [test, setTest] = useState("");
  const [numOfTest, setNumOfTest] = useState("");
  const [testTiming, setTestTiming] = useState("");
  const [category, setCategory] = useState("");
  const [sample, setSample] = useState(0);
  const [report, setReport] = useState("");

  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Ayurveda",
    "Vitamins & supplements",
    "Healthcare devices",
    "Pain Relief",
    "Diabetes Care",
    "Skin Care",
  ];


  const samples = [
    "Pain Relief",
    "Diabetes Care",
    "Skin Care",
  ];

  const testPackageId = id;

  useEffect(() => {
    if (testPackage && testPackage._id !== testPackageId) {
      dispatch(getPackageDetails(testPackageId));
    } else {
      setName(testPackage.name);
      setDescription(testPackage.description);
      setPrice(testPackage.price);
      setVerify(testPackage.verify);
      setTest(testPackage.tests);
      setNumOfTest(testPackage.numOfTest);
      setTestTiming(testPackage.testTiming);
      setCategory(testPackage.category);
      setSample(testPackage.sample);
      setReport(testPackage.report);
      setOldImages(testPackage.images);
 
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
      dispatch({ type: UPDATE_PACKAGE_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    Navigate,
    isUpdated,
    testPackageId,
    testPackage,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("price", price);
    myForm.set("verify", verify);
    myForm.set("test", test);
    myForm.set("numOfTest", numOfTest);
    myForm.set("testTiming", testTiming);
    myForm.set("category", category);
    myForm.set("sample", sample);
    myForm.set("report", report);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updatePackage(testPackageId, myForm));
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
      <MetaData title="Update Package" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Package</h1>

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
                value={price}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="text"
                placeholder="Verify"
                required
                value={verify}
                onChange={(e) => setVerify(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="text"
                placeholder="Test"
                required
                value={test}
                onChange={(e) => setTest(e.target.value)}
              />
            </div>

            <div>
              <AttachMoneyIcon />
              <input
                type="Number"
                placeholder="tabletPerStrip"
                required
                value={numOfTest}
                onChange={(e) => setNumOfTest(e.target.value)}
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
              <AccountTreeIcon />
              <select
                value={sample}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Sample</option>
                {samples.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

        
     
            <div>
              <StorageIcon />
              <input
                type="text"
                placeholder="Report"
                valuereport
                value={report}
                required
                onChange={(e) => setReport(e.target.value)}
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

export default UpdatePackage;
