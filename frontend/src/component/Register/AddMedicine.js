import axios from "axios";
import React from "react";
import { useState,  } from "react";
import "./AddMedicine.css";

const AddMedicine = () => {
 
  
  const [medicineData, setMedicineData] = useState({
    medicineCategory: "",
    medicineName: "",
    salt: "",
    productImage: "",
    type: "",
    expired: "",
    tablet_per_strip: "",
    price: "",
    stock: "",
    category:"",
    company:"",
    gst:"",
    batch_code:"",
    hsn_code:""

  });

  const handleInput = (e) => {
    const feildName = e.target.name;
    const value = e.target.value;

    setMedicineData({ ...medicineData, [feildName]: value });
  };
  const uploadProductImage = (e) => {
      console.log(e.target.files)
    setMedicineData({
      ...medicineData,
      productImage: e.target.files,
    });
  };

  

  const submithandler = async (e) => {
    e.preventDefault();
    const {
        medicineCategory,
        medicineName,
        salt,
        productImage,
        type,
        expired,
        tablet_per_strip,
        price,
        stock,
        category,
        company,
        gst,
        batch_code,
        hsn_code
    } = medicineData;
console.log(medicineData)
console.log(medicineCategory)
console.log(medicineName)
console.log(salt)
console.log(productImage)
console.log(type)
console.log(expired)
console.log(tablet_per_strip)
console.log(price)
console.log(stock)
console.log(category)
console.log(company)
console.log(gst)
console.log(batch_code)
console.log(hsn_code)
    if (
        !medicineCategory||
        !medicineName||
        !salt||
        !productImage ||
        !type||
        !expired||
        !tablet_per_strip||
        !price||
        !stock||
        !category||
        !company||
        !gst||
        !batch_code||
        !hsn_code
      ) {
      window.alert("Plz fill the form first");
    } else {
      const url = "medicine";
      const formData = new FormData();
      console.log(
        `pp ${medicineData.productImage}=====${medicineData.productImage[0].name}`
        );

        for(let i =0 ; i<productImage.length ; i++){
            formData.append(
                "productImage",
                medicineData.productImage[i],
              medicineData.productImage[i].name
            );
            console.log( medicineData.productImage[i])
            console.log( medicineData.productImage[i].name)
        }
       
        // formData.append(
        //     "productImage",
        //     medicineData.productImage,
        //   medicineData.productImage[0].name
        // )

        // for (let i = 0; i < productImage.length; i++) {
        //   formData.append(productImage[i].name, productImage[i])
        // }
        // formData.append(
        //     "productImage",
        //     medicineData.productImage[1],
        //   medicineData.productImage[1].name
        // )
    

      formData.append("medicineCategory", medicineData.medicineCategory);
      formData.append("medicineName", medicineData.medicineName);
      formData.append("salt", medicineData.salt);
      formData.append("type", medicineData.type);
      formData.append("expired", medicineData.expired);
      formData.append("tablet_per_strip", Number(medicineData.tablet_per_strip));
      formData.append("price", Number(medicineData.price));
      formData.append("stock", Number(medicineData.stock));
      formData.append("category", medicineData.category);
      formData.append("company", medicineData.company);
      formData.append("gst", medicineData.gst);
      formData.append("batch_code", medicineData.batch_code);
      formData.append("hsn_code", medicineData.hsn_code);
      try {
        let response = await axios.post(url, formData);
        if (response.status === 422 || !response) {
          window.alert("Invalid Registration");
        } else {
          window.alert("Medicine added Successfull ");
          console.log("Medicine added Successfull ");
          setMedicineData({
            medicineCategory: "",
    medicineName: "",
    salt: "",
    productImage:"",
    type: "",
    expired: "",
    tablet_per_strip: "",
    price: "",
    stock: "",
    category:"",
    company:"",
    gst:"",
    batch_code:"",
    hsn_code:""
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
              <h1 className="form-title my-5">Add Medicine</h1>

              <form
                className="register-form"
                method="POST"
                onSubmit={submithandler}
              >
                <div className="form-group dropDown">
                  <label htmlFor="medicineCategory">Choose a Medicine Category : </label>
                  <select name="medicineCategory" id="medicineCategory" onChange={handleInput}>
                    <option value="selectCategory" selected disabled hidden >Select Category</option>
                    <option value="volvo">Ayurveda</option>
                    <option value="saab">Vitamins & supplements</option>
                    <option value="opel">Pain Relief</option>
                    <option value="audi">Diabetes Care</option>
                    <option value="audi">Skin Care</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="medicineName">
                    <i className="zmdi zmdi-account zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="text"
                    name="medicineName"
                    id="medicineName"
                    autoComplete="none"
                    value={medicineData.medicineName}
                    onChange={handleInput}
                    placeholder="Enter Medicine Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="salt">
                    <i className="zmdi zmdi-email zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="text"
                    name="salt"
                    id="salt"
                    autoComplete="none"
                    value={medicineData.salt}
                    onChange={handleInput}
                    placeholder="Enter salt"
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
                  <label htmlFor="type">
                    <i className="zmdi zmdi-address zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="text"
                    name="type"
                    id="type"
                    autoComplete="none"
                    value={medicineData.type}
                    onChange={handleInput}
                    placeholder="Enter Type"
                  />
                </div>

                {/* <div className="form-group">
                  <label htmlFor="image">
                    <i className="zmdi zmdi-account zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="file"
                    name="certificateImage"
                    onChange={uploadCertificateImage}
                  />
                </div> */}

                <div className="form-group">
                  <label htmlFor="expired">
                    <i className="zmdi zmdi-lock zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="date"
                    name="expired"
                    id="expired"
                    autoComplete="off"
                    value={medicineData.expired}
                    onChange={handleInput }
                    placeholder="Enter Expired date "
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tablet_per_strip">
                    <i className="zmdi zmdi-lock zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="Number"
                    name="tablet_per_strip"
                    id="tablet_per_strip"
                    autoComplete="off"
                    value={medicineData.tablet_per_strip}
                    onChange={handleInput}
                    placeholder="Enter tablet Per Strip"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">
                    <i className="zmdi zmdi-lock zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    autoComplete="off"
                    value={medicineData.price}
                    onChange={handleInput}
                    placeholder="Enter Price"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="stock">
                    <i className="zmdi zmdi-lock zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="number"
                    name="stock"
                    id="stock"
                    autoComplete="off"
                    value={medicineData.stock}
                    onChange={handleInput}
                    placeholder="Enter Stock"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">
                    <i className="zmdi zmdi-lock zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="text"
                    name="category"
                    id="category"
                    autoComplete="off"
                    value={medicineData.category}
                    onChange={handleInput}
                    placeholder="Enter Category"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company">
                    <i className="zmdi zmdi-lock zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    autoComplete="off"
                    value={medicineData.company}
                    onChange={handleInput}
                    placeholder="Enter Company"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="gst">
                    <i className="zmdi zmdi-lock zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="text"
                    name="gst"
                    id="gst"
                    autoComplete="off"
                    value={medicineData.gst}
                    onChange={handleInput}
                    placeholder="Enter GST"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="batch_code">
                    <i className="zmdi zmdi-lock zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="text"
                    name="batch_code"
                    id="batch_code"
                    autoComplete="off"
                    value={medicineData.batch_code}
                    onChange={handleInput}
                    placeholder="Enter BATCH CODE"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="hsn_code">
                    <i className="zmdi zmdi-lock zmdi-hc-lg material-icon-name"></i>
                  </label>
                  <input
                    type="text"
                    name="hsn_code"
                    id="hsn_code"
                    autoComplete="off"
                    value={medicineData.hsn_code}
                    onChange={handleInput}
                    placeholder="Enter HSN CODE"
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

   

    

    </>
  );
};

export default AddMedicine;
