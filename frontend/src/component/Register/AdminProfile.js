import React,{useEffect,useState} from 'react'
import axios from 'axios';
import "./AdminDashborad.css"
const AdminProfile = () => {
    const [myData, setMyData] = useState([]);
    const [isError, setIsError] = useState([]);
  
    const apiCall = () => {
  
      axios
        .get("pharmacy/profile/6385bfe3554f246d0f3af294")
        .then((res) => setMyData(res.data))
        .catch((error) => setIsError(error.message));
    };
  
    useEffect(() => {
      apiCall();
    }, []);

  return (
    <>
    <div className=' profilePage '>
       <div><h2>Admin Profile</h2></div>
       { myData.data && [myData.data].map(elem =>{
      const { category,
        name,
        contact,
        profileImage,
        address,
        certificateImage,
        fromTime,
        toTime,
        status,} = elem
      return(  <div  key={elem._id}>
        <p>category : {category}</p>
        <p>name : {name}</p>
        <p>contact : {contact}</p>
        <img  style={{height:"20vh",width:"20vw"}} src={profileImage}  alt=""/>
        <p>address : {address}</p>
        <img style={{height:"20vh",width:"20vw"}} src={certificateImage} alt=""/>
        <p> fromTime : {fromTime}</p>
        <p> toTime : {toTime}</p>
        <p> status : {status}</p>
      </div>)
    })  }
    </div>
    </>
  )
}

export default AdminProfile