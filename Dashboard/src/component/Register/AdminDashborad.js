import React from 'react'
import { Link } from 'react-router-dom' 
import "./AdminDashborad.css"

const AdminDashborad = () => {
  return (
    <>
    <div className='container'>
    <div className=' title' >Here is the  Admin Dashborad</div>
    <div  className='link ' ><Link  to={"/addMedicine"}  > ADD Medicine </Link></div>
    <div><Link  to={"/addTest"} > ADD Test </Link></div>
    <div  className='profile'><Link to={"/adminprofile"} >View profile</Link></div>
    </div>
    </>
  )
}

export default AdminDashborad