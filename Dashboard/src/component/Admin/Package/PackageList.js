import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "../Product/productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminPackage,
  deletePackage,
} from "../../../actions/testAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "../Sidebar";
import { DELETE_PACKAGE_RESET } from "../../../constants/testConstants";
import NotFoundProduct from "../../layout/NotFound/NotFoundProduct";

const PackageList = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const alert = useAlert();

  const { error, packages } = useSelector((state) => state.packages);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.testPackage
  );

  const deleteProductHandler = (id) => {
    dispatch(deletePackage(id));
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
      alert.success("Package Deleted Successfully");
      Navigate("/admin/packages");
      dispatch({ type: DELETE_PACKAGE_RESET });
    }

    dispatch(getAdminPackage());
  }, [dispatch, alert, error, deleteError, Navigate, isDeleted]);

  const columns = [
    {
      field: "id",
      headerName: "Package ID",
      minWidth: 150,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      hide: true,
    },

    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      headerAlign: "center",
      align: "center",

      renderCell: (params) => {
        return (
          <div style={{ height: "90px", width: "60px", borderRadius: "30%" }}>
            {" "}
            <img
              style={{ height: "100%", width: "100%" }}
              src={params.value}
              alt="package"
            />
          </div>
        );
      },
      // editable: true,
    },
    {
      field: "sample",
      headerName: "Sample",
      minWidth: 50,
      flex: 0.3,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 60,
      headerAlign: "center",
      align: "center",
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/package/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
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
  console.log(packages);
  packages &&
    packages.forEach((item) => {
      rows.push({
        id: item._id,
        type: "image",
        image: item.images[0].url,
        price: item.price,
        report: item.report,
        sample: item.sample,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PACKAGE - Admin`} />

      <div className="dashboard">
        <SideBar />

        {packages && packages.length > 0 ? (
          <>
            <div className="productListContainer">
              <div className="heading">
                <h1 id="productListHeading">ALL PACKAGE</h1>
              </div>
              <div>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className="productListTable"
                  rowHeight={100}
                  autoHeight

                  // checkboxSelection
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

export default PackageList;
