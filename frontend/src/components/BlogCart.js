import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const userimage=localStorage.getItem("userimage")
const username=localStorage.getItem("username")

const Blogcart=()=>{

    const [myfiles,setMyfiles]=useState("")
    const navigate=useNavigate()
    const blankBlog={
        "title":"",
         "image":"",
         "category":"",
         "post":""
    }
    
    const [mydata,setMydata]=useState(blankBlog)
    const handlFile=(e)=>{
        setMyfiles(e.target.files[0])
}
    const handelsubmit=async()=>{
        const formData=new FormData();
        formData.append("file",myfiles)
        formData.append("upload_preset",'jpnppfpt')
        formData.append('cloud_name','dqsi8ffeg')
        const responce=await axios.post('http://api.cloudinary.com/v1_1/dqsi8ffeg/image/upload',formData);
      //  console.log(responce.data.url);
        let api="http://localhost:8000/v1/create";
           await  axios.post(api,{title:mydata.title,category:mydata.category,post:mydata.post,image:responce.data.url,userimage:userimage,username:username}).then((res)=>{         
               if(res.data=="plz fill all data"){
                
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
               else{
                   navigate("/home")
               }
            })
      //  console.log(mydata)
     }
    
    return(
        <>
       <div className="cart-items">
         <div className="cart-menu">
         <h2>Create Blog Post</h2>
         <div className="title">
            <label>title</label>
            <input type="text" alt="" value={mydata.title} onChange={(e)=>{setMydata({...mydata,title:e.target.value})}}/>
            <label>Category</label>
            <select name='category' value={mydata.category}  onChange={(e)=>{setMydata({...mydata,category:e.target.value})}}>
            <option disabled>Select Category</option>
                <option>Nature</option>
                <option>Travels</option>
                <option>Technology</option>
                <option>Politics</option>
            </select>
            <label>Image</label>
          <input type="file"  onChange={handlFile} />
          <label>Post</label>
          <ReactQuill className='title-quil' theme="snow" value={mydata.post} onChange={(e)=>{setMydata({...mydata,post:e})}} />
     
          <button  onClick={handelsubmit} className='new-post-btn2'>Submit</button>
         </div>
         </div>
       </div>
       <ToastContainer />
        </>
    )
}
export default Blogcart;