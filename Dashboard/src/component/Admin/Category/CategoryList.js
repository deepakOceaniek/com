import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "../Product/productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminCategory,
  deleteCategory,
} from "../../../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "../Sidebar";
import { DELETE_CATEGORY_RESET } from "../../../constants/productConstants";

const CategoryList = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const alert = useAlert();

  const { error, categories } = useSelector((state) => state.categories);
console.log(categories)
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteCategory(id));
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
      Navigate("/admin/dashboard");
      dispatch({ type: DELETE_CATEGORY_RESET });
    }

    dispatch(getAdminCategory());
  }, [dispatch, alert, error, deleteError, Navigate, isDeleted]);

  const columns = [
    { field: "id", headerName: "Category ID", minWidth: 100, flex: 0.4 ,headerAlign: "center",
    align: "center",},

    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 0.4,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "image",
      headerName: "Image",
      width: 300,
      flex: 0.4,

      headerAlign: "center",
      align: "center",

      renderCell: (params) => {
        return (
          <div style={{ height: "90px", width: "60px", borderRadius: "30%" }}>
          
            <img
              style={{ height: "100%", width: "100%" }}
              src={params.value}
              alt="Category"
            />
          </div>
        );
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/category/${params.getValue(params.id, "id")}`}>
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
  categories &&
  categories.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.categoryName,
        image: item.categoryImage.url,
        // image:  <img src={item.categoryImage.url}  alt="category" />  ,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL CATEGORY - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL CATEGORY</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            rowHeight={100}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default CategoryList;
