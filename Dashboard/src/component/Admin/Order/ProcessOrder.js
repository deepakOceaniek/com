import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "../Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../layout/Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../../constants/orderConstant";
import "./processOrder.css";

const ProcessOrder = () => {
  const { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  console.log(order);
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newOrderContainer">
          {loading ? (
            <Loader />
          ) : (
            // <div
            //   className="confirmOrderPage"
            //   style={{
            //     display: order.orderStatus === "Delivered" ? "block" : "grid",
            //   }}
            // >
            <div className="orderProcess">
              <div className="orderContainer">
                <div className="confirmshippingArea">
                  <div>
                    <h1>Order Details :</h1>
                  </div>
                  <div className="orderDetailsContainerBox">
                    <h1>Shipping Info</h1>
                    <div>
                      <p>Name : </p>
                      <p>
                        &nbsp;&nbsp;&nbsp;
                        {order.shippingInfo &&
                          order.shippingInfo.address.defaultAddress[0].name}
                      </p>
                    </div>
                    <div>
                      <p>Phone :</p>
                      <p>
                        &nbsp;&nbsp;&nbsp;
                        {order.shippingInfo &&
                          order.shippingInfo.address.defaultAddress[0].contact}
                      </p>
                    </div>
                    <div>
                      <p>Address :</p>
                      <p>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address.defaultAddress[0].address}, ${order.shippingInfo.address.defaultAddress[0].area}, ${order.shippingInfo.address.defaultAddress[0].city}, ${order.shippingInfo.address.defaultAddress[0].pinCode}, ${order.shippingInfo.address.defaultAddress[0].state}`}
                      </p>
                    </div>
                  </div>

                  <div className="orderDetailsContainerBox">
                    <h1>Payment</h1>
                    <div>
                      <p>Paid : </p>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount :</p>
                      <p>{order.totalPrice && order.totalPrice}</p>
                    </div>
                  </div>

                  <div className="orderDetailsContainerBox">
                    <h1>Order Status</h1>
                    <div>
                      <p>Order Status :</p>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display:
                      order.orderStatus === "Delivered" ? "none" : "block",
                  }}
                >
                  <form
                    className="updateOrderForm"
                    onSubmit={updateOrderSubmitHandler}
                  >
                    <h1>Update Order status </h1>

                    <div>
                      <AccountTreeIcon />
                      <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Update Status</option>
                        {order.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}

                        {order.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    </div>

                    <Button
                      id="createProductBtn"
                      type="submit"
                      disabled={
                        loading ? true : false || status === "" ? true : false
                      }
                    >
                      Process
                    </Button>
                  </form>
                </div>
              </div>
              <div>
                <div className="confirmCartItems">
                  <h1>Order Items </h1>
                  <div className="confirmCartItemsContainer">
                    <div>
                      <p>Product Image</p>
                      <p>Name</p>
                      <p>quantity</p>
                      <p>price</p>
                      <p>totalPrice</p>
                    </div>
                  </div>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product._id}>
                          <img src={item.product.images[0].url} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.product.name}
                          </Link>
                          <p>{item.quantity}</p>
                          <p>₹{item.product.price}</p>
                          <p>
                            <b>₹{item.product.price * item.quantity}</b>
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
