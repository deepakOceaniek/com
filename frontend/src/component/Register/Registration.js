import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import "./Registration.css";

const Registration = () => {
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState([]);

  const apiCall = () => {
    axios
      .get("pharmacy/profile/637e5553aa795ea274b0f369")
      .then((res) => setMyData(res.data))
      .catch((error) => setIsError(error.message));
  };

  useEffect(() => {
    apiCall();
  }, []);
  
  const [registrationData, setRegistrationData] = useState({
    category: "",
    name: "",
    contact: "",
    pharmacyImage: "",
    address: "",
    certificateImage: "",
    fromTime: "",
    toTime: "",
    status: "",
  });

  const handleInput = (e) => {
    const feildName = e.target.name;
    const value = e.target.value;

    setRegistrationData({ ...registrationData, [feildName]: value });
  };

  const uploadPharmacyImage = (e) => {
    setRegistrationData({
      ...registrationData,
      pharmacyImage: e.target.files[0],
    });
  };

  const uploadCertificateImage = (e) => {
    setRegistrationData({
      ...registrationData,
      certificateImage: e.target.files[0],
    });
  };

  const submithandler = async (e) => {
    e.preventDefault();
    const {
      category,
      name,
      contact,
      pharmacyImage,
      address,
      certificateImage,
      fromTime,
      toTime,
      status,
    } = registrationData;
    
    if (
      !category ||
      !name ||
      !contact ||
      !pharmacyImage ||
      !address ||
      !certificateImage ||
      !fromTime ||
      !toTime ||
      !status
      ) {
      window.alert("Plz fill the form first");
    } else {
      const url = "pharmacy/registration";
      const formData = new FormData();
      console.log(
        `pp ${registrationData.pharmacyImage}=====${registrationData.pharmacyImage.name}`
        );
        formData.append(
          "pharmacyImage",
          registrationData.pharmacyImage,
        registrationData.pharmacyImage.name
      );
      formData.append(
        "certificateImage",
        registrationData.certificateImage,
        registrationData.certificateImage.name
      );
      formData.append("category", registrationData.category);
      formData.append("name", registrationData.name);
      formData.append("contact", registrationData.contact);
      formData.append("address", registrationData.address);
      formData.append("fromTime", registrationData.fromTime);
      formData.append("toTime", registrationData.toTime);
      formData.append("status", registrationData.status);

      try {
        console.log(formData);
        let response = await axios.post(url, formData);
        if (response.status === 422 || !response) {
          window.alert("Invalid Registration");
        } else {
          window.alert("Registration Successfull ");
          console.log("Registration Successfull ");
          setRegistrationData({
            category: "",
            name: "",
            contact: "",
            pharmacyImage: "",
            address: "",
            certificateImage: "",
            fromTime: "",
            toTime: "",
            status: "",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  return (
    <>
      <section className="registration">
        <div className="container">
          <div className="registration-content d-flex justify-content-center align-items-center">
            <div className="registration-form  ">
              <h1 className="form-title my-5">Admin Registration</h1>

              <form
                className="register-form"
                method="POST"
                onSubmit={submithandler}
              >
                <div className="form-group dropDown">
                  <label htmlFor="category">Choose a Category : </label>
                  <select name="category" id="category" onChange={handleInput}>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="name">
                    <i className="zmdi zmdi-account zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="none"
                    value={registrationData.name}
                    onChange={handleInput}
                    placeholder="Your Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact">
                    <i className="zmdi zmdi-email zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="contact"
                    name="contact"
                    id="contact"
                    autoComplete="none"
                    value={registrationData.contact}
                    onChange={handleInput}
                    placeholder="Your Contact"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="image">
                    <i className="zmdi zmdi-account zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="file"
                    name="pharmacyImage"
                    onChange={uploadPharmacyImage}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">
                    <i className="zmdi zmdi-address zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="address"
                    name="address"
                    id="address"
                    autoComplete="none"
                    value={registrationData.address}
                    onChange={handleInput}
                    placeholder="Your address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="image">
                    <i className="zmdi zmdi-account zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="file"
                    name="certificateImage"
                    onChange={uploadCertificateImage}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="fromTime">
                    <i className="zmdi zmdi-lock zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="time"
                    name="fromTime"
                    id="fromTime"
                    autoComplete="off"
                    value={registrationData.fromTime}
                    onChange={handleInput}
                    placeholder="From Time"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="toTime">
                    <i className="zmdi zmdi-lock zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="time"
                    name="toTime"
                    id="toTime"
                    autoComplete="off"
                    value={registrationData.toTime}
                    onChange={handleInput}
                    placeholder="To Time"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status">
                    <i className="zmdi zmdi-lock zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="text"
                    name="status"
                    id="status"
                    autoComplete="off"
                    value={registrationData.status}
                    onChange={handleInput}
                    placeholder="status"
                  />
                </div>
                <div className="form-group form-submit">
                  <input
                    type="submit"
                    name="register"
                    id="register"
                    className="form-submit"
                    value="Register"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

    { myData.data && [myData.data].map(elem =>{
      const { category,
        name,
        contact,
        pharmacyImage,
        address,
        certificateImage,
        fromTime,
        toTime,
        status,} = elem
      return(  <div  key={elem._id}>
        <p>{category}</p>
        <p>{name}</p>
        <p>{contact}</p>
        <img src={pharmacyImage}  alt=""/>
        <p>{address}</p>
        <img src={certificateImage}  alt=""/>
        <p>{fromTime}</p>
        <p>{toTime}</p>
        <p>{status}</p>
      </div>)
    })  }

    {}

    </>
  );
};

export default Registration;
