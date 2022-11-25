import axios from "axios";
import React from "react";
import { useState,  } from "react";
import "./AddMedicine.css";

const AddMedicine = () => {
 
  
  const [testData, setTestData] = useState({
    // medicineCategory: "",
    testName: "",
    testPrice: "",
    // productImage: "",
    testPrecautions: "",
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
//   const uploadProductImage = (e) => {
//       console.log(e.target.files)
//     setTestData({
//       ...testData,
//       productImage: e.target.files,
//     });
//   };

  

  const submithandler = async (e) => {
    e.preventDefault();
    const {
    testName,
    testPrice,
    testPrecautions,
    testDescription,
    testVerified,
    requiedTest,
    sampleRequied,
    Report,
    } = testData;
console.log(testData)
console.log(testName)
console.log(testPrice)
console.log(testDescription)
console.log(testVerified)
console.log(requiedTest)
console.log(sampleRequied)
console.log(Report)
    if (
        !testName||
        !testPrice||
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
          window.alert("Medicine added Successfull ");
          console.log("Medicine added Successfull ");
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
                  <label htmlFor="sampleRequied">Choose for Sample Required : </label>
                  <select name="sampleRequied" id="sampleRequied" onChange={handleInput}>
                    <option value="selectSample" selected disabled hidden >Select Sample</option>
                    <option value="volvo">Blood Sample</option>
                    <option value="saab">Urine Samples</option>
                    <option value="opel">Serum Samples</option>
                    <option value="audi">Core Samples</option>
                  </select>
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
                  <label htmlFor="Report"> Report : </label>
                  <select name="Report" id="Report" onChange={handleInput}>
                    <option value="selectReport" selected disabled hidden >Select Report</option>
                    <option value="volvo">Same Day</option>
                    <option value="saab">1-2 Days</option>
                    <option value="opel">3-4 Days</option>
                    <option value="audi">! week </option>
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
