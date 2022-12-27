/* eslint-disable array-callback-return */
import React, { Fragment, useEffect, useState } from "react";
import "../Product/newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createSample } from "../../../actions/testAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../layout/MetaData";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "../Sidebar";
import Loader from "../../layout/Loader/Loader";
import { NEW_SAMPLE_RESET } from "../../../constants/testConstants";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newSample);

  const [name, setName] = useState("");
  const [sampleCode, setSampleCode] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Sample Created Successfully");
      Navigate("/admin/dashboard");
      dispatch({ type: NEW_SAMPLE_RESET });
    }
  }, [dispatch, alert, error, Navigate, success]);


  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("sampleCode", sampleCode);
    dispatch(createSample(myForm));

  };

  return (
    <Fragment>
      <MetaData title="Create Sample" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
         {loading ? <Loader /> :  <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Add New Sample</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Sample Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          
      
            <div>
              <AttachMoneyIcon />
              <input
                type="text"
                placeholder="Sample Code"
                required
                value={sampleCode}
                onChange={(e) => setSampleCode(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Add Sample
            </Button>
          </form>}
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
