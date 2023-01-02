import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "../Product/productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "../Sidebar";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../../constants/orderConstant";
import NotFoundProduct from "../../layout/NotFound/NotFoundProduct";

const OrderList = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      Navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, Navigate, isDeleted]);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minwidth: 250,
      flex: 0.1,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 250,
      flex: 0.1,
      align: "center",
      headerAlign: "center",
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 200,
      flex: 0.1,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "amount",
      headerName: "Amount",
      minWidth: 200,
      type: "number",
      flex: 0.1,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "actions",
      flex: 0.1,
      headerName: "Actions",
      minWidth: 250,
      type: "number",
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />

        {orders && orders.length > 0 ? (
          <>
            <div className="productListContainer">
              <div className="heading">
                <h1 id="productListHeading">ALL ORDERS</h1>
              </div>
              <div style={{ height: 350, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  // rowsPerPageOptions={8}
                  disableSelectionOnClick
                  className="productListTable"
                  autoHeight
                />
              </div>
            </div>
          </>
        ) : (
          <NotFoundProduct />
        )}
      </div>
    </Fragment>
  );
};

export default OrderList;
