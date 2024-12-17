import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginValidation from "./Loginvalidation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
const Login=()=>{
    const [loginValues,setLoginValues]=useState({
        email:"",
        password:""
    })
    const [error,setError]=useState({})
    const navigate=useNavigate()
    const handleInput=(e)=>{
        let name=e.target.name;
        let val=e.target.value;
        setLoginValues(values=>({...values,[name]:val}))
    }
    const handleSubmit=()=>{
        setError(LoginValidation(loginValues))
        if( error.email===""&&error.password===""){
            let api="http://localhost:8000/v1/login";
            axios.post(api,loginValues).then((res)=>{
                localStorage.setItem("token",res.data.token);
                localStorage.setItem("username",res.data.username);
                localStorage.setItem("email",res.data.email)
                localStorage.setItem("userimage",res.data.userimage)
                localStorage.setItem("userId",res.data.id)

                if(res.data.massage=="you are login.."){
                    navigate("/home")
                }
                else{
                    toast.error(res.data, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                       
                        
                        });
                }
              
              console.log(res.data)
            })
        }
    }
  //  console.log(loginValues)
    return(
        <>
       <div className="sign-up-page">
       <div className="sign-up-item">
               <h2>Sign-In</h2>
            </div>
           
            <div className="sign-up-item">
                <label>Email</label>
                <input type="email" name="email" onChange={handleInput}/>
                {error.email && <span className="text-error">{error.email}</span>}
            </div>
            <div className="sign-up-item">
                <label>Password</label>
                <input type="password" name="password" onChange={handleInput} />
                {error.password && <span className="text-error">{error.password}</span>}
            </div>
            <div className="sign-up-item">
                <button onClick={handleSubmit}>login</button>
                <p>You are agree aour term and policies</p>
            </div>
            <div className="sign-up-item2">
               <Link to="/ragister"><button>Create Account</button></Link>
              
            </div>
       </div>
       <ToastContainer />
        </>
    )
}
export default Login;