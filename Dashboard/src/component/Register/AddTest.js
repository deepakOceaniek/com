import axios from "axios";
import React, { Fragment } from "react";
import { useState,  } from "react";
import "./AddMedicine.css";

const AddMedicine = () => {
 
  
  const [testData, setTestData] = useState({
    // medicineCategory: "",
    testName: "",
    testPrice: "",
    testPrecautions: "",
    productImage: "",
    testDescription: "",
    testVerified: "",
    requiedTest: "",
    sampleRequied: "",
    Report:"",
   

  });

  const handleInput = (e) => {
    const feildName = e.target.name;
    const value = e.target.value;

    setTestData({ ...testData, [feildName]: value });
  };
  const uploadProductImage = (e) => {
      console.log(e.target.files)
    setTestData({
      ...testData,
      productImage: e.target.files,
    });
  };


  

  const submithandler = async (e) => {
    e.preventDefault();
    const {
    testName,
    testPrice,
    testPrecautions,
    productImage,
    testDescription,
    testVerified,
    requiedTest,
    sampleRequied,
    Report,
    } = testData;
console.log(testData)
console.log(testName)
console.log(testPrice)
console.log(testPrecautions)
console.log(productImage)
console.log(testDescription)
console.log(testVerified)
console.log(requiedTest)
console.log(sampleRequied)
console.log(Report)
    if (
        !testName||
        !testPrice||
        !testPrecautions ||
        !productImage ||
        !testDescription||
        !testVerified||
        !requiedTest||
        !sampleRequied||
        !Report
      ) {
      window.alert("Plz fill the form first");
    } else {
      const url = "test";
      const formData = new FormData();
      console.log(
        `pp ${testData.productImage}=====${testData.productImage[0].name}`
        );

        for(let i =0 ; i<productImage.length ; i++){
          formData.append(
              "productImage",
              testData.productImage[i],
              testData.productImage[i].name
          );
          console.log( testData.productImage[i])
          console.log( testData.productImage[i].name)
      }

        // for(let i =0 ; i<productImage.length ; i++){
        //     formData.append(
        //         "productImage",
        //         testData.productImage[i],
        //       testData.productImage[i].name
        //     );
        //     console.log( testData.productImage[i])
        //     console.log( testData.productImage[i].name)
        // }
       
    

      formData.append("testName", testData.testName);
      formData.append("testPrice", testData.testPrice);
      formData.append("testPrecautions", testData.testPrecautions);
      formData.append("testDescription", testData.testDescription);
      formData.append("testVerified", testData.testVerified);
      formData.append("requiedTest", testData.requiedTest);
      formData.append("sampleRequied", testData.sampleRequied);
      formData.append("Report", testData.Report);
     
      try {
        let response = await axios.post(url, formData);
        if (response.status === 422 || !response) {
          window.alert("Invalid Registration");
        } else {
          window.alert("Test added Successfull ");
          console.log("Test added Successfull ");
          setTestData({
    testName: "",
    testPrice: "",
    testPrecautions:"",
    testDescription: "",
    testVerified: "",
    requiedTest: "",
    sampleRequied: "",
    Report:"",
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
              <h1 className="form-title my-5">Add Test</h1>

              <form
                className="register-form"
                method="POST"
                onSubmit={submithandler}
              >

                <div className="form-group">
                  <label htmlFor="testName">
                    <i className="zmdi zmdi-account zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="text"
                    name="testName"
                    id="testName"
                    autoComplete="none"
                    value={testData.testName}
                    onChange={handleInput}
                    placeholder="Enter Test Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="testPrice">
                    <i className="zmdi zmdi-email zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="text"
                    name="testPrice"
                    id="testPrice"
                    autoComplete="none"
                    value={testData.testPrice}
                    onChange={handleInput}
                    placeholder="Enter Test Price"
                  />
                </div>
          
                <div className="form-group">
                  <label htmlFor="testPrecautions">
                    <i className="zmdi zmdi-address zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="text"
                    name="testPrecautions"
                    id="testPrecautions"
                    autoComplete="none"
                    value={testData.testPrecautions}
                    onChange={handleInput}
                    placeholder="Enter Test Precautions"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="image">
                    <i className="zmdi zmdi-account zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="file"
                    name="productImage"
                    multiple
                    onChange={uploadProductImage}
                  />
                </div>


                <div className="form-group">
                  <label htmlFor="testDescription">
                    <i className="zmdi zmdi-lock zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="text"
                    name="testDescription"
                    id="testDescription"
                    autoComplete="off"
                    value={testData.testDescription}
                    onChange={handleInput }
                    placeholder="Enter Test Description  "
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="testVerified">
                    <i className="zmdi zmdi-lock zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="text"
                    name="testVerified"
                    id="testVerified"
                    autoComplete="off"
                    value={testData.testVerified}
                    onChange={handleInput}
                    placeholder="Enter Test Verified"
                  />
                </div>
                <div className="form-group dropDown">
                  <label htmlFor="sampleRequied">Choose for Sample Required : </label>
                  <select name="sampleRequied" id="sampleRequied" onChange={handleInput}>
                    <option   disabled selected hidden >Select Sample</option>
                    <option value="Blood Sample">Blood Sample</option>
                    <option value="Urine Samples">Urine Samples</option>
                    <option value="Serum Samples">Serum Samples</option>
                    <option value="Core Samples">Core Samples</option>
                  </select>
                </div>
              
                <div className="form-group">
                  <label htmlFor="requiedTest">
                    <i className="zmdi zmdi-lock zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="text"
                    name="requiedTest"
                    id="requiedTest"
                    autoComplete="off"
                    value={testData.requiedTest}
                    onChange={handleInput}
                    placeholder="Enter Requied Test"
                  />
                </div>


             
             


                <div className="form-group dropDown">
                  <label htmlFor="Report"> Report : </label>
                  <select name="Report" id="Report" onChange={handleInput}>
                    <option value="selectReport" selected disabled hidden >Select Report</option>
                    <option value="Same Day">Same Day</option>
                    <option value="1-2 Days">1-2 Days</option>
                    <option value="3-4 Days">3-4 Days</option>
                    <option value="1 week">1 week </option>
                  </select>
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

   

    

    </>
  );
};

export default AddMedicine;
