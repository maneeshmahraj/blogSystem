
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginValidation from "./Loginvalidation";
import axios from "axios";
const Ragister=()=>{
    const [myfiles,setMyfiles]=useState("")
    const [loginValues,setLoginValues]=useState({
        name:"",
        email:"",
        userimage:"",
        password:""
    })
    const navigate=useNavigate()
    const [error,setError]=useState({})
    const handleInput=(e)=>{
        let name=e.target.name;
        let val=e.target.value;
        setLoginValues(values=>({...values,[name]:val}))
    }
    const handlFile=(e)=>{
        setMyfiles(e.target.files[0])
}
    const handleSubmit=async()=>{
        setError(LoginValidation(loginValues))
        const formData=new FormData();
        formData.append("file",myfiles)
        formData.append("upload_preset",'jpnppfpt')
        formData.append('cloud_name','dqsi8ffeg')
        const responce=await axios.post('http://api.cloudinary.com/v1_1/dqsi8ffeg/image/upload',formData);
      //  console.log(responce.data.url);
        if(error.name===""&& error.email===""&&error.password===""){
            let api="http://localhost:8000/v1/register";
            axios.post(api,{name:loginValues.name,email:loginValues.email,userimage:responce.data.url,password:loginValues.password}).then((res)=>{
              navigate("/login")
            })
        }
    }
    return(
        <>
       <div className="sign-up-page">
       <div className="sign-up-item">
               <h2>Sign-Up</h2>
            </div>
            <div className="sign-up-item">
                <label>Name</label>
                <input type="text" name="name" onChange={handleInput} />
                {error.name && <span className="text-error">{error.name}</span>}
            </div>
            <div className="sign-up-item">
                <label>Email</label>
                <input type="email" name="email" onChange={handleInput}/>
                {error.email && <span className="text-error">{error.email}</span>}
            </div>
            <div className="sign-up-item">
            <label>Image</label>
          <input type="file"  onChange={handlFile} />
          </div>
            <div className="sign-up-item">
                <label>Password</label>
                <input type="password" name="password" onChange={handleInput} />
                {error.password && <span className="text-error">{error.password}</span>}
            </div>

            <div className="sign-up-item">
                <button onClick={handleSubmit}>Sign-Up</button>
                <p>You are agree aour term and policies</p>
            </div>
            <div className="sign-up-item2">
                <Link to="/login"><button>Sign-In</button></Link>
              
            </div>
       </div>
        </>
    )
}
export default Ragister;