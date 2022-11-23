import React from "react";
import { useState } from "react";
import "./Registration.css";

// let isEdit = false;
const Registration = () => {
  const [registrationData, setRegistrationData] = useState({
    category :"",
    name: "",
    contact: "",
    pharmacyImage: "",
    address: "",
    certificateImage: "",
    fromTime: "",
    toTime: "",
    status: "",
  });

  const [phImage ,setPhImage ] =useState("")
  const [cfImage ,setCfImage ] =useState("")
  const fileInput1 = React.createRef();
  const fileInput2 = React.createRef();
  // const [response, setResponse] = useState([]);
  const handleInput = (e) => {
    const feildName = e.target.name;
    const value = e.target.value;


    setRegistrationData({ ...registrationData, [feildName]: value });
 
  };

  // const isEditHandler = () => {
  //   isEdit = true;
  //   setRegistrationData({
  //     name: response[0].name,
  //     email: response[0].email,
  //     address: response[0].address,
  //     password: response[0].password,
  //     confpassword: response[0].confpassword,
  //   });
  // };

  const submithandler = async (e) => {
    e.preventDefault();
    const {  category ,
    name,
    contact,
    pharmacyImage ,
    address,
    certificateImage ,
    fromTime,
    toTime,
    status, } = registrationData;
  //      setRegistrationData({  ...registrationData,
  //     pharmacyImage: fileInput1.current.files[0].name,  
  //     certificateImage:fileInput2.current.files[0].name,  
  // });
setPhImage( fileInput1.current.files[0].name);
setCfImage(fileInput2.current.files[0].name)
    console.log(registrationData)
    console.log(fileInput1.current.files[0].name,)
    console.log(fileInput2.current.files[0].name,)
  

    if (!category  ||
    !name ||
    !contact ||
    !pharmacyImage ||
    !address ||
    !certificateImage ||
    !fromTime ||
    !toTime ||
    !status ) {
      window.alert("Plz fill the form first");
    } else {
      const url= "pharmacy/registration";

      const resposne = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category ,
    name,
    contact,
    phImage,
    address,
    cfImage,
    fromTime,
    toTime,
    status,
        }),
      });
      const data = await resposne.json();
      console.log(data)
      if (resposne.status === 422 || !data) {
        window.alert("Invalid Registration");
      } else {
        window.alert("Registration Successfull ");
        console.log("Registration Successfull ");
        // setResponse([data]);
        setRegistrationData({
          category :"",
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
                 
                  <label htmlFor="category" >Choose a Category : </label>
                  <select name="category" id="category"  onChange={handleInput} >
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
                   ref={fileInput1}
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
                    ref={fileInput2}
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

              {/* <div className="form-group form-submit">
                <button
                  name="edit"
                  id="edit"
                  className="form-edit"
                  onClick={isEditHandler}
                >
                  Edit
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      {/* <div className="response_data">
        {response.map((currEl) => {
          const { _id, name, email, address, password } = currEl;
          return (
            <div className="field" key={_id}>
              <p>{name}</p>
              <p>{email}</p>
              <p>{address}</p>
              <p>{password}</p>
            </div>
          );
        })}
      </div> */}
    </>
  );
};

export default Registration;
