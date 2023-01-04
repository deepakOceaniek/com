import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import WebFont from "webfontloader";
import Home from "./component/Home/Home.js";
import Loader from "./component/layout/Loader/Loader.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser, loadadmin } from "./actions/userAction";
import UserOption from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProfileUpdate from "./component/User/ProfileUpdate.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import axios from "axios";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
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
// import ProtectedRoute from "./component/Route/ProtectedRoute"; // Its not working
import Registration from "./component/Register/Registration";
import AddMedicine from "./component/Register/AddMedicine";
import AddTest from "./component/Register/AddTest";
import AdminDashborad from "./component/Register/AdminDashborad";
function App() {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  // console.log(isAuthenticated);
  // console.log(stripeApiKey);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadadmin());
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  // It will disable the rightclick so we can not inspect
  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
      <Router>
        <Header />

        {isAuthenticated && <UserOption user={{ loading, user }} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loading" element={<Loader />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />

          <Route path="/search" element={<Search />} />
          {isAuthenticated && <Route path="/account" element={<Profile />} />}
          {isAuthenticated && (
            <Route path="/me/update" element={<ProfileUpdate />} />
          )}
          {isAuthenticated && (
            <Route path="/password/update" element={<UpdatePassword />} />
          )}
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />

          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/admin/login" element={<AdminLoginSignUp />} />
          <Route path="/cart" element={<Cart />} />
          {isAuthenticated && (
            <Route path="/login/shipping" element={<Shipping />} />
          )}
          {isAuthenticated && (
            <Route path="/order/confirm" element={<ConfirmOrder />} />
          )}

          {isAuthenticated && (
            <Route
              path="/process/payment"
              element={
                stripeApiKey && (
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                )
              }
            />
          )}

          {isAuthenticated && (
            <Route path="/success" element={<OrderSuccess />} />
          )}
          {isAuthenticated && <Route path="/orders" element={<MyOrders />} />}
          {isAuthenticated && (
            <Route path="/order/:id" element={<OrderDetails />} />
          )}

          <Route
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
          <Route path="*" element={<ErrorPage />} />

          {isAuthenticated && (
            <Route path="/admin/me" element={<AdminProfile />} />
          )}

          <Route path="/Registration" element={<Registration />} />
          <Route path="/admindashboard" element={<AdminDashborad />} />
          {/* <Route path="/adminprofile" element={<AdminProfile />} /> */}

          <Route path="/addMedicine" element={<AddMedicine />} />
          <Route path="/addTest" element={<AddTest />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
