import React,{ useState } from 'react'
import { useDispatch ,useSelector} from "react-redux";
import { Navigate } from 'react-router-dom';
import { verify, clearErrors } from "../actions/userAction";
import { useNavigate } from 'react-router-dom';


const UserOtpScreen = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate()
    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
      );

    const [otp, setOtp] = useState(0)
    console.log(otp)
    console.log(isAuthenticated,loading)

    const  submitOtp = (e)=>{
        e.preventDefault()
    dispatch(verify(otp));
    if(isAuthenticated)
    Navigate("/admin/dashboard")
 }


  return (
    <> <div> 
        <form  onSubmit={submitOtp} >

            <input type ="number"  onChange={(e)=>{setOtp(e.target.value)}}   />
            <button value="submit">Submit</button> 
        </form>
         </div></>
  )
}

export default UserOtpScreen