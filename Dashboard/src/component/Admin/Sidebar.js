import React from "react";
import "./sidebar.css";
// import logo from "./images/Group";
import { Link ,useNavigate} from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import VerticalAlignTopIcon from "@material-ui/icons/VerticalAlignTop";
import UsbIcon from "@material-ui/icons/Usb";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useDispatch } from "react-redux";
import {logout } from "../../actions/userAction"

const Sidebar = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const  logoutUser =()=> {
    dispatch(logout());
    alert.success("Logout Successfully");
    Navigate("/login");
  }
  return (
    <div className="sidebar">
      <Link to="/">
        <img src="../Images/Group.png" alt="MediPros" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem
                nodeId="2"
                label="All"
                icon={<FormatListBulletedIcon />}
              />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/prescription">
        <p>
          <RateReviewIcon />
          Prescription
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
      <Link to="/admin/addPrescription">
        <p>
          <PeopleIcon /> Add Prescription
        </p>
      </Link>
     
      <Link>
        <TreeView
          defaultCollapseIcon={<VerticalAlignTopIcon />}
          defaultExpandIcon={<UsbIcon />}
        >
          <TreeItem nodeId="1" label="Banner">
            {/* using UserView */}
            <Link to="/banner">  
              <TreeItem
                nodeId="2"
                label="All"
                icon={<FormatListBulletedIcon />}
              />
            </Link>

            <Link to="/admin/addBanner">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>

      <Link>
        <TreeView
          defaultCollapseIcon={<VerticalAlignTopIcon />}
          defaultExpandIcon={<UsbIcon />}
        >
          <TreeItem nodeId="1" label="Category">
            <Link to="/admin/categories">
              <TreeItem
                nodeId="2"
                label="All"
                icon={<FormatListBulletedIcon />}
              />
            </Link>

            <Link to="/admin/category">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>

      <Link>
        <TreeView
          defaultCollapseIcon={<VerticalAlignTopIcon />}
          defaultExpandIcon={<UsbIcon />}
        >
          <TreeItem nodeId="1" label="Lab Category">
            <Link to="/admin/labcategories">
              <TreeItem
                nodeId="2"
                label="All"
                icon={<FormatListBulletedIcon />}
              />
            </Link>

            <Link to="/admin/labcategory">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>

      <Link to="/admin/me">
        <p>
          <AccountCircleIcon /> Profile
        </p>
      </Link>
      <Link to="/login" onClick={logoutUser}>
        <p>
          <ExitToAppIcon /> Logout
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
