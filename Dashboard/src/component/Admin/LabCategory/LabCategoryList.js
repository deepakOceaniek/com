import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "../Product/productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminLabCategory,
  deleteLabCategory,
} from "../../../actions/testAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "../Sidebar";
import { DELETE_LABCATEGORY_RESET } from "../../../constants/testConstants";
import NotFoundProduct from "../../layout/NotFound/NotFoundProduct";
import Loader from "../../layout/Loader/Loader";
const LabCategoryList = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const alert = useAlert();

  const {loading, error, labCategories } = useSelector((state) => state.labCategories);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.testPackage
  );
  console.log(labCategories)

  const deleteProductHandler = (id) => {
    dispatch(deleteLabCategory(id));
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
      alert.success("Category Deleted Successfully");
      Navigate("/admin/labcategories");
      dispatch({ type: DELETE_LABCATEGORY_RESET });
    }

    dispatch(getAdminLabCategory());
  }, [dispatch, alert, error, deleteError, Navigate, isDeleted]);

  const columns = [
    {
      field: "id",
      headerName: "Category ID",
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
      flex: 0.3,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "image",
      headerName: "Image",
      width: 300,
      headerAlign: "center",
      align: "center",

      renderCell: (params) => {
        return (
          <div style={{ height: "90px", width: "60px", borderRadius: "30%" }}>
            {" "}
            <img
              style={{ height: "100%", width: "100%" }}
              src={params.value}
              alt="labCategories"
            />
          </div>
        );
      },
      // editable: true,
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
            <Link to={`/admin/labcategory/${params.getValue(params.id, "id")}`}>
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

  labCategories &&
  labCategories.forEach((item) => {
      rows.push({
        id: item._id,
        type: "image",
        image: item.images[0].url,
        name: item.categoryName,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL Lab Categories - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
       {loading ? (<Loader />): <>
       <h1 id="productListHeading">All Lab Categories</h1>
{labCategories && labCategories.length > 0 ?( <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            rowHeight={95}
            // checkboxSelection
          />):(
            <NotFoundProduct />
          )}
       </>}
         
        </div>
      </div>
    </Fragment>
  );
};

export default LabCategoryList;
