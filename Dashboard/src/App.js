import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import WebFont from "webfontloader";
import Loader from "./component/layout/Loader/Loader.js";
import store from "./store";
import { loadadmin } from "./actions/userAction";
import UserOption from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UserList from "./component/Admin/UserList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import ErrorPage from "./component/layout/NotFound/ErrorPage.js";
import AdminLoginSignUp from "./component/User/AdminLoginSignUp";
import AdminProfile from "./component/User/AdminProfile.js";
import NewCategory from "./component/Admin/NewCategory.js";
import CategoryList from "./component/Admin/CategoryList.js";
import UpdateCategory from "./component/Admin/UpdateCategory.js";
import LoginScreen from "./component/User/LoginScreen";
import RegisterScreen from "./component/User/RegisterScreen";
import OtpScreen from "./component/User/OtpScreen";
import Prescription from "./component/Admin/Prescription.js";
import AddPrescription from "./component/Admin/AddPrescription";
import AddBanner from "./component/Admin/AddBanner.js"

import Home from "./component/User/payment/Home.js"
import PaymentSuccess from "./component/User/payment/PaymentSuccess.js"
import NewlabCategory from "./component/Admin/NewlabCategory";
import LabCategoryList from "./component/Admin/LabCategoryList";
import UpdateLabCategory from "./component/Admin/UpdateLabCategory";
import NewTest from "./component/Admin/NewTest.js"
import TestList from "./component/Admin/TestList.js"
import UpdateTest from "./component/Admin/UpdateTest.js"
import NewPackage from "./component/Admin/NewPackage.js"
import PackageList from "./component/Admin/PackageList.js"
import UpdatePackage from "./component/Admin/UpdatePackage.js"

// import ProtectedRoute from "./component/Route/ProtectedRoute"; // Its not working
// import Registration from "./component/Register/Registration";
// import AddMedicine from "./component/Register/AddMedicine";
// import AddTest from "./component/Register/AddTest";
// import AdminDashborad from "./component/Register/AdminDashborad";
function App() {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
const [contactData ,setContactData] = useState("")
const [registerData, setRegisterData] = useState("")
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadadmin());
    // store.dispatch(loadUser());
  }, []);
  // It will disable the rightclick so we can not inspect
  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
      <Router>
        {/* <Header /> */}

        {/* {isAuthenticated && <UserOption user={{ loading, user }} />} */}
        <Routes>
          <Route path="/loading" element={<Loader />} />

          {/* <Route path="/search" element={<Search />} /> */}
          {/* {isAuthenticated && (
            <Route path="/me/update" element={<ProfileUpdate />} />
          )} */}

          {/* <Route path="/admin/login" element={<AdminLoginSignUp />} /> */}
          <Route path="/" element={<LoginScreen  setContactData ={ setContactData}/>} />
          <Route path="/admin/register" element={<RegisterScreen  setRegisterData={setRegisterData} />} />
          <Route path="/otp" element={<OtpScreen data={[contactData,registerData]}   />} />

          <Route
            OtpScreen
            path="/admin/dashboard"
            element={
              // <ProtectedRoute isAdmin={true}>
              <Dashboard />
              // </ProtectedRoute>
            }
          />
          {isAuthenticated && (
            <Route path="/admin/products" element={<ProductList />} />
          )}
          {isAuthenticated && (
            <Route path="/admin/product" element={<NewProduct />} />
          )}
          {isAuthenticated && (
            <Route path="/admin/product/:id" element={<UpdateProduct />} />
          )}

          {isAuthenticated && (
            <Route path="/admin/orders" element={<OrderList />} />
          )}
          {isAuthenticated && (
            <Route path="/admin/order/:id" element={<ProcessOrder />} />
          )}
          {isAuthenticated && (
            <Route path="/admin/users" element={<UserList />} />
          )}
          {isAuthenticated && (
            <Route path="/admin/user/:id" element={<UpdateUser />} />
          )}
          {isAuthenticated && (
            <Route path="/admin/reviews" element={<ProductReviews />} />
          )}
          {/* <Route path="*" element={<ErrorPage />} /> */}

          {isAuthenticated && (
            <Route path="/admin/me" element={<AdminProfile />} />
          )}

          {isAuthenticated && (
            <Route path="/admin/categories" element={<CategoryList />} />
          )}
          {isAuthenticated && (
            <Route path="/admin/category" element={<NewCategory />} />
          )}
          {isAuthenticated && (
            <Route path="/admin/category/:id" element={<UpdateCategory />} />
          )}

          {isAuthenticated && (
            <Route path="/admin/prescription" element={<Prescription />} />
          )}

          {isAuthenticated && (
            <Route
              path="/admin/addPrescription"
              element={<AddPrescription />}
            />
          )}

{isAuthenticated && (
            <Route
              path="/admin/addBanner"
              element={<AddBanner />}
            />
          )}

<Route path="/payment" element={<Home />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />

       
            <Route path="/admin/labcategory" element={<NewlabCategory />} />
            <Route path="/admin/labcategories" element={<LabCategoryList />} />
            <Route path="/admin/labcategory/:id" element={<UpdateLabCategory />} />

            <Route path="/admin/test" element={<NewTest />} />
            <Route path="/admin/tests" element={<TestList />} />
            <Route path="/admin/test/:id" element={<UpdateTest />} />

            <Route path="/admin/package" element={<NewPackage />} />
            <Route path="/admin/packages" element={<PackageList />} />
            <Route path="/admin/package/:id" element={<UpdatePackage />} />
          

          {/* <Route path="/Registration" element={<Registration />} /> */}
          {/* <Route path="/admindashboard" element={<AdminDashborad />} /> */}
          {/* <Route path="/adminprofile" element={<AdminProfile />} /> */}

          {/* <Route path="/addMedicine" element={<AddMedicine />} /> */}
          {/* <Route path="/addTest" element={<AddTest />} /> */}
        </Routes>

        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
