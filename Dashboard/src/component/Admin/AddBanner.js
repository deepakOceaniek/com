import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createBanner } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import {NEW_BANNER_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";

const AddBanner = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newbanner);

  const [bannerImage, setBannerImage] = useState();
  const [bannerPreview, setBannerPreview] = useState("/Profile.png");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Category Banner Successfully");
      Navigate("/admin/dashboard");
      dispatch({ type: NEW_BANNER_RESET });
    }
  }, [dispatch, alert, error, Navigate, success]);

  const createBannerSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("bannerImage", bannerImage);

    dispatch(createBanner(myForm));
  };

  const createBannerImagesChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setBannerPreview(reader.result);
        setBannerImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Fragment>
      <MetaData title="Create Category" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createBannerSubmitHandler}
          >
            <h1>Create Banner</h1>

         

            <div id="updateProfileImage">
              <img src={bannerPreview} alt="Banner Preview" />
              <input
                type="file"
                name="bannerImage"
                accept="image/*"
                onChange={createBannerImagesChange}
              />
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

export default AddBanner;
